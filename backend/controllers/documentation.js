require("dotenv").config();
const db = require("../db/db");
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

// const getObjectUrl = async (key)=>{
//     const command = new GetObjectCommand({
//         Bucket:"studentdocumentsrnsit",
//         Key:key
//     });
//     const url = getSignedUrl(s3Client,command);
//     return url;
// }

const putObject = async (filename, contentType) => {
  const command = new PutObjectCommand({
    Bucket: "studentdocumentsrnsit",
    Key: `${filename}`,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
};

const GetUploadUrl = async (req, res) => {
  const { uniqueid } = req.user;
  const { batch, fileName } = req.query;
  // const underscoreSeparatedName = name.replace(/ /g, '_');
  // console.log(underscoreSeparatedName);
  // const Name = uniqueid + "_" + underscoreSeparatedName;
  // const path = batch + "/" + Name + "/" + fileName;
  try {
    const Student = await db
      .promise()
      .query(`SELECT name FROM student_${batch} where id = ?`, [uniqueid]);
    const name = Student[0][0].name;
    const underscoreSeparatedName = name.replace(/ /g, "_");
    //   console.log(underscoreSeparatedName);
    const Name = uniqueid + "_" + underscoreSeparatedName;
    const path = batch + "/" + Name + "/" + fileName;
    const url = await putObject(path, "application/pdf");
    //   console.log(url);
    res.json({ url: url, path });
  } catch (error) {
    res.json(error);
  }
};

module.exports = { GetUploadUrl };
