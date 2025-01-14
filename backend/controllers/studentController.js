const db = require("../db/db");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const getAllBatches = async (req, res) => {
  try {
    const [rows] = await db
      .promise()
      .query(
        `SELECT table_name FROM information_schema.tables WHERE table_name LIKE 'student\\_%' AND table_name NOT LIKE 'student\\_%\\_%'`
      );
    const batches = rows.map((row) => row.TABLE_NAME.replace("student_", ""));

    res.status(200).json({ batches });
  } catch (error) {
    console.error("Error executing the query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getStudentData = async (req, res) => {
  try {
    const { batch, page } = req.query;
    const start_index = (page - 1) * 50;
    const data = await db
      .promise()
      .query(`SELECT count(*) FROM student_${batch}`);
    const { ["count(*)"]: countValue } = data[0][0];
    const pagesCount = Math.ceil(countValue / 50);
    const [rows] = await db
      .promise()
      .query(
        `SELECT * FROM student_${batch} ORDER BY insertion_order Limit ${start_index},50`
      );
    const response = await db
      .promise()
      .query(`SELECT count(*) FROM student_${batch} WHERE status = 1`);
    const { ["count(*)"]: statusCount } = response[0][0];

    const response1 = await db
      .promise()
      .query(
        `select admission_category from student_${batch} group by admission_category;`
      );
    res.status(200).json({
      rows,
      length: rows.length,
      pagesCount: pagesCount,
      countValue: countValue,
      statusCount: statusCount,
      category: response1[0],
    });
  } catch (error) {
    console.error("Error executing the query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const studentAuth = async (req, res) => {
  const { uniqueid } = req.body;
  const batch = req.query;
  if (!uniqueid) {
    return res.status(400).json({
      msg: "Enter unique id and student name",
    });
  }
  try {
    const data = await db
      .promise()
      .query(`SELECT * FROM student_${batch.batch} WHERE id = ? `, [uniqueid]);
    if (data[0].length > 0) {
      const token = jwt.sign({ uniqueid }, process.env.JWT_SECRET);

      return res
        .status(200)
        .json({ msg: "Student logged in successfully", token });
    } else {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Internal Error occured",
    });
  }
};
const search = async (req, res) => {
  const { id, name, admission_category, status, batch } = req.query;
  const queryObject = {};

  if (admission_category) {
    queryObject.admission_category = admission_category;
  }

  if (id) {
    queryObject.id = id;
  }

  if (name) {
    queryObject.name = name;

    try {
      const queryString = `SELECT * FROM student_${batch} WHERE name LIKE ?`;
      const [students] = await db
        .promise()
        .query(queryString, [`%${queryObject.name}%`]);
      if (students.length === 0) {
        return res.status(201).json("No students found...");
      }

      return res.status(200).json(students);
    } catch (error) {
      console.error(error);
      res.status(400).json({ msg: "Something went wrong..." });
    }
  }

  if (status) {
    queryObject.status = status;
  }

  try {
    console.log([queryObject]);
    const queryString = `SELECT * FROM student_${batch} WHERE ?`;
    const students = await db.promise().query(queryString, queryObject);

    if (students.length === 0) {
      return res.status(201).json("No students found...");
    }

    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Something went wrong..." });
  }
};

const uploadStudentInfo = async (req, res) => {
  const { uniqueid } = req.user;

  const {
    First_name,
    Last_name,
    email,
    Phone_Number,
    Aadhar_Number,
    Gender,
    date_of_birth,
    current_address,
    Permanent_address,
    religion,
    category,
    nationality,
    state,
    branch,
    admission_quota,
    registration_number_10th,
    passing_year_10th,
    school_name_10th,
    PUC_registration_Number,
    PUC_Passing_Number,
    PUC_college_name,
    batch,
  } = req.body;
  if (
    !uniqueid ||
    !First_name ||
    !Last_name ||
    !email ||
    !Phone_Number ||
    !Aadhar_Number ||
    !Gender ||
    !date_of_birth ||
    !current_address ||
    !Permanent_address ||
    !religion ||
    !category ||
    !nationality ||
    !state ||
    !branch ||
    !admission_quota ||
    !registration_number_10th ||
    !passing_year_10th ||
    !school_name_10th ||
    !PUC_registration_Number ||
    !PUC_Passing_Number ||
    !PUC_college_name
  ) {
    return res.status(400).json({ msg: "please enter the mentioned details" });
  }
  try {
    await db
      .promise()
      .query(
        `insert into student_${batch}_details values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          uniqueid,
          First_name,
          Last_name,
          email,
          Phone_Number,
          Aadhar_Number,
          Gender,
          date_of_birth,
          current_address,
          Permanent_address,
          religion,
          category,
          nationality,
          state,
          branch,
          admission_quota,
          registration_number_10th,
          passing_year_10th,
          school_name_10th,
          PUC_registration_Number,
          PUC_Passing_Number,
          PUC_college_name,
        ]
      );
    res.status(200).json({ msg: "data uploaded successfully!!!" });
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong...", error });
  }
};

const getStudentDetails = async (req, res) => {
  const { uniqueid } = req.user;
  const { batch } = req.query;
  try {
    const data = await db
      .promise()
      .query(`select * from student_${batch}_details where id = ?`, [uniqueid]);
    const studentdetails = data[0][0];
    res.status(200).json(studentdetails);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong...", error });
  }
};

const documentsUpload = async (req, res) => {
  const key = req.body.key;
  const colName = req.body.fileName;
  const { batch } = req.query;

  const { uniqueid } = req.user;
  var query;

  try {
    const checkQuery = `SELECT COUNT(*) as count FROM student_${batch}_documents WHERE id = ?`;

    const [rows1] = await db.promise().query(checkQuery, [uniqueid]);
    const count = rows1[0].count;

    if (count > 0) {
      query = `UPDATE student_${batch}_documents SET ${colName}="${key}" WHERE id=? `;
    } else {
      query = `INSERT INTO student_${batch}_documents(id,${colName}) values("${uniqueid}","${key}")`;
    }

    await db.promise().query(query, [uniqueid]);
    const [rows] = await db
      .promise()
      .query(`SELECT * FROM student_${batch}_documents WHERE id = ?`, [
        uniqueid,
      ]);

    if (rows.length === 0) {
      console.log("No row found with the given id.");
    } else {
      const row = rows[0];
      let allColumnsFilled = true;
      // Check if any column in the row is NULL
      for (const column in row) {
        if (row[column] === null) {
          allColumnsFilled = false;
          break;
        }
      }

      if (allColumnsFilled) {
        await db
          .promise()
          .query(`UPDATE student_${batch} SET status=1 WHERE id=?`, [uniqueid]);
      }
    }

    res.status(200).json({ msg: "document key uploaded successfully!!!" });
  } catch (error) {
    res.status(400).json({ msg: "something went wrong", error });
  }
};

const get_student_data = async (req, res) => {
  const { batch, uniqueId } = req.query;
  if (!batch) {
    return res.status(400).json({ msg: "Batch must be entred!!!" });
  }
  try {
    const student_details = await db.promise().query(
      `
    SELECT *
    FROM student_${batch}_details
    JOIN student_${batch}_documents ON student_${batch}_details.id = student_${batch}_documents.id
    WHERE student_${batch}_details.id = ? 
`,
      [uniqueId, uniqueId]
    );

    const data = student_details[0];
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ msg: "something went wrong", error });
  }
};
const getStudentDocuments = async (req, res) => {
  const { uniqueid } = req.user;
  const { batch } = req.query;

  try {
    const [rows] = await db
      .promise()
      .query(`SELECT * FROM student_${batch}_documents WHERE id = ?`, [
        uniqueid,
      ]);

    if (rows.length === 0) {
      // Insert a new record with the given id
      await db
        .promise()
        .query(`INSERT INTO student_${batch}_documents (id) VALUES (?)`, [
          uniqueid,
        ]);

      // Execute the select query again
      const [newRows] = await db
        .promise()
        .query(`SELECT * FROM student_${batch}_documents WHERE id = ?`, [
          uniqueid,
        ]);
    } else {
      // Use the existing rows for further processing
      // console.log(rows);
    }
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong...", error });
  }
};

const sendVerificationCodeEmail = async (username, verificationCode, Email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SECRET_EMAIL, // Your Gmail address
      pass: process.env.SECRET_PASS, // Your Gmail password or an app-specific password
    },
  });

  const mailSuperAdmin = {
    from: process.env.SECRET_EMAIL,
    to: Email,
    subject: "Verification Code for Registration",
    html: `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: grey;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh; /* Make body fill entire viewport height */
    }
    .container {
      max-width: 600px;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
      padding: 20px;
      text-align: left; /* Align content within container to left */
    }
    h1, h4, p {
      margin: 0;
      padding: 0;
    }
    h1 {
      color: #333333;
      font-size: 36px;
      margin-bottom: 10px;
    }
    h4 {
      color: #4CAF50;
      font-size: 24px;
      margin-bottom: 20px;
    }
    p {
      color: #555555;
      font-size: 18px;
      margin-bottom: 10px;
      margin-top: 10px;
    }
    .code {
      display: flex;
      justify-content: center;
    }
    .digit {
      background-color: #4CAF50;
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 24px;
      margin: 0 5px;
      width: 10px;
      text-align: center;
    }
    .footer {
      font-style: italic;
      color: #888888;
      margin-top: 20px;
    }
    .logo {
      max-width: 100px;
      margin-bottom: 20px;
    }
    .timer {
      font-size: 20px;
      color: #4CAF50;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <img src="https://www.rnsit.ac.in/wp-content/themes/rnsit/webp/logo.webp" alt="College Logo" class="logo">
      <h1>Hello,</h1>
      <p><strong>${username}</strong> Requested verification code for admin registration in student documentation upload website ~RNSIT</p>
      <p>To approve their request, please use the verification code below:</p>
      <div class="code">
        <span class="digit">${String(verificationCode).charAt(0)}</span>
        <span class="digit">${String(verificationCode).charAt(1)}</span>
        <span class="digit">${String(verificationCode).charAt(2)}</span>
        <span class="digit">${String(verificationCode).charAt(3)}</span>
        <span class="digit">${String(verificationCode).charAt(4)}</span>
        <span class="digit">${String(verificationCode).charAt(5)}</span>
      </div>
      <p class="footer">For verification purposes only for the student documentation upload <br> Thank You</p>
    </div>
  </div>
</body>
</html>

  `,
  };

  try {
    await transporter.sendMail(mailSuperAdmin);
    console.log(`Verification code sent`);
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send verification code to email.");
  }
};

module.exports = {
  getStudentData,
  getAllBatches,
  studentAuth,
  search,
  uploadStudentInfo,
  getStudentDetails,
  documentsUpload,
  get_student_data,
  getStudentDocuments,
  get_student_data,
  sendVerificationCodeEmail,
};
