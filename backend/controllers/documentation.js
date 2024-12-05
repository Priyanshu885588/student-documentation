require("dotenv").config();
const fs = require("fs");
const analysis = require("../models/studentscore");
const pdfParse = require("pdf-parse");
const db = require("../db/db");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECERET_KEY_ID,
  },
});

// Set up your API key for Google Generative AI
const genAI = new GoogleGenerativeAI("AIzaSyDQjMdu_i86POQh-ze6fvSYqoHCurohQNY");

// Function to extract text from PDF buffer
async function extractTextFromPDF(pdfBuffer) {
  const data = await pdfParse(pdfBuffer); // Use the buffer directly without saving to file
  return data.text;
}

// Function to send text to Gemini for processing
async function analyzeMarksWithGemini(extractedText) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Based on the following extracted text, extract the subjects and their marks in a key-value format:
    ${extractedText}
    Return the result as a JSON object with the subject name as the key and marks as the value.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  // Clean up the text to ensure it is valid JSON
  const cleanedText = text.replace(/```json|\n|`/g, "").trim();
  return cleanedText;
}

// Function to retrieve PDF from S3 and log extracted text
const getPDFFromS3 = async (req, res) => {
  const { uniqueid } = req.user;
  const { batch } = req.query;

  const checkQuery = `SELECT 6th_sem_marks FROM student_${batch}_documents WHERE id = ?`;

  const [rows1] = await db.promise().query(checkQuery, [uniqueid]);
  const key = rows1[0];
  console.log(key["6th_sem_marks"]);
  const command = new GetObjectCommand({
    Bucket: "studentdocumentsrnsit",
    Key: key["6th_sem_marks"], // Update this with actual S3 path
  });

  try {
    const s3Object = await s3Client.send(command);
    const pdfBuffer = await streamToBuffer(s3Object.Body);

    // Extract text directly from the PDF buffer
    const extractedText = await extractTextFromPDF(pdfBuffer);

    // Log the extracted text

    // Optionally, send the extracted text to Gemini for further processing
    const result = await analyzeMarksWithGemini(extractedText);

    // Log the Gemini result
    // console.log("Gemini Analysis Result:", JSON.parse(result));

    // Send response with the result
    const result1 = await analysis.create({
      userId: uniqueid,
      analysedinfo: result,
    });

    res.status(200).json({
      message: "PDF processed successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error retrieving PDF from S3:", error);
    res.status(500).json({ error: "Error retrieving PDF from S3" });
  }
};

// Helper function to convert stream to buffer
function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => {
      chunks.push(chunk);
    });
    stream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    stream.on("error", (err) => {
      reject(err);
    });
  });
}

// Function to upload file to S3 and return signed URL
const putObject = async (filename, contentType) => {
  const command = new PutObjectCommand({
    Bucket: "studentdocumentsrnsit",
    Key: `${filename}`,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
};

// Example function to get S3 upload URL
const GetUploadUrl = async (req, res) => {
  const { uniqueid } = req.user;
  const { batch, fileName } = req.query;

  try {
    const Student = await db
      .promise()
      .query(`SELECT name FROM student_${batch} where id = ?`, [uniqueid]);
    const name = Student[0][0].name;
    const underscoreSeparatedName = name.replace(/ /g, "_");
    const Name = uniqueid + "_" + underscoreSeparatedName;
    const path = batch + "/" + Name + "/" + fileName;
    const url = await putObject(path, "application/pdf");
    res.json({ url: url, path });
  } catch (error) {
    res.json(error);
  }
};

const getAllanalyzedData = async (req, res) => {
  try {
    const data = await analysis.find({});
    if (data.length === 0) {
      return res.status(404).json({ msg: "No data found" });
    }
    return res
      .status(200)
      .json({ msg: "Data found successfully!", data: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { GetUploadUrl, getPDFFromS3, getAllanalyzedData };
