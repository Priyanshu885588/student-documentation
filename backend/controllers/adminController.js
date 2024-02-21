const express = require("express");
const app = express();
const db = require("../db/db");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin");
const nodemailer = require("nodemailer");
const ExcelJS = require("exceljs");
const fs = require("fs");
const fse = require('fs-extra'); 


require("dotenv").config();

const AdminRegister = async (req, res) => {
  adminModel.createAdminTable();
  const { Username, Password } = req.body;
  if (!Username || !Password) {
    return res
      .status(400)
      .json({ message: "Please enter Username and Password" });
  }
  console.log(Username, Password);
  const token = jwt.sign({ Username, Password }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  try {
    await db
      .promise()
      .query("insert into admin_table (Gmail,Password) values(?,?)", [
        Username,
        Password,
      ]);

    res
      .status(200)
      .json({ message: "Admin registred Successfuly", token: token });
  } catch (error) {
    const admin = await db
      .promise()
      .query("select Gmail from admin_table where Gmail = ?", [Username]);
    if (admin) {
      res.status(400).json({
        message: `Admin with the username ${Username} already exists`,
      });
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  }
};

const AdminLogin = async (req, res) => {
  const { Username, Password } = req.body;
  try {
    const data = await db
      .promise()
      .query("select * from admin_table where Gmail = ? && Password = ?", [
        Username,
        Password,
      ]);
    if (data[0].length > 0) {
      const token = jwt.sign({ Username, Password }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.status(200).json({ token, msg: "Admin logged in successfully" });
    } else {
      res.status(400).json({ message: "Credential doesn't match!!!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const sendVerificationCode = async (req, res) => {
  try {
    const { username, verificationCode } = req.body;

    await sendVerificationCodeEmail(username, verificationCode);
    return res
      .status(200)
      .json({ message: "Verification code sent successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendVerificationCodeEmail = async (username, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SECRET_EMAIL, // Your Gmail address
      pass: process.env.SECRET_PASS, // Your Gmail password or an app-specific password
    },
  });

  const mailSuperAdmin = {
    from: process.env.SECRET_EMAIL,
    to: "basketball313032@gmail.com",
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
  }

  if (status) {
    queryObject.status = status;
  }

  try {
    console.log([queryObject]);
    const queryString = `SELECT * FROM student_${batch} WHERE ?`;
    const students = await db.promise().query(queryString, [queryObject]);

    if (students.length === 0) {
      return res.status(201).json("No job offers found...");
    }

    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Something went wrong..." });
  }
};

const downloadStudentsInfo = async (req, res) => {
  const { batch } = req.query;
  try {
    const student_details = await db.promise().query(`
          SELECT *
          FROM student_${batch}
          LEFT JOIN student_${batch}_details ON student_${batch}.id = student_${batch}_details.id;
      `);

    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Student Details");

    // Add column headers to the worksheet
    const columns = [];
    student_details[1].forEach((column) => {
      columns.push({ header: column.name, key: column.name, width: 20 });
    });
    worksheet.columns = columns;

    // Add data rows to the worksheet
    student_details[0].forEach((row) => {
      worksheet.addRow(row);
    });

    // Generate a unique filename for the Excel file
    const filename = `student_details_${batch}.xlsx`;
    const filePath = `excel/${filename}`; // Specify the directory where you want to store the file

    // Write the Excel file to the specified directory
    await workbook.xlsx.writeFile(filePath);

    res.status(200).json({ filename }); // Send the filename in the response
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteStudentsData=async (req,res)=>{
  const id=req.query.id;
  const batch=req.query.batch;

  const query1=`DELETE FROM student_${batch}_details WHERE id='${id}'`;
  const query2=`DELETE FROM student_${batch}_documents WHERE id='${id}'`;
  const namequery=`SELECT name from student_${batch} WHERE id='${id}'`;

  try {
    const [data1,data2] = await Promise.all([db.promise().query(query1),db.promise().query(query2)]);
    const name=await db.promise().query(namequery);
    const path=`C:/uploads/${name[0][0].name}`
    if (fs.existsSync(path)) {
      fse.removeSync(path); // Use fs-extra to remove the directory recursively
      console.log(`Directory ${path} deleted successfully.`);
  } else {
      console.log(`Directory ${path} does not exist.`);
  }
    return res.status(200).json({ msg: "details, documents and directory deleted"});
  } catch (error) {
    return res.status(400).json({ msg: "Something went wrong...", error });
  }
}

module.exports = {
  AdminRegister,
  AdminLogin,
  sendVerificationCode,
  search,
  downloadStudentsInfo,
  deleteStudentsData
};
