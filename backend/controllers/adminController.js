const express = require("express");
const app = express();
const db = require("../db/db");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin");
const nodemailer = require("nodemailer");
const ExcelJS = require('exceljs');
const fs = require('fs');

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
    <html>
      <head>
        <style>
          body {
            text-align: center;
            background-color: #f4f4f4;
            font-family: 'Arial', sans-serif;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h2 {
            color: #333333;
          }
          p {
            color: #555555;
          }
        </style>
      </head>
      <body>
        <div class="container">
        <center>
        <h6>${username} </h6>
          <h4>Requested verification code for admin registration in student documentation upload website ~RNSIT</h4>
          <br>
          <p>Verification code is:</p>
          <h1><strong>${verificationCode}</strong></h1>
          </center>
          <br>
          <br>
          <br>
          <h6 style="font-style: italic;">For verification purposes only for the student documentation upload <br> Thank You</h6>
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

const search = async (req,res)=>{
const { id,name,admission_category,status,batch} = req.query;
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

if(status){
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
}

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
      const worksheet = workbook.addWorksheet('Student Details');

      // Add column headers to the worksheet
      const columns = [];
      student_details[1].forEach(column => {
          columns.push({ header: column.name, key: column.name, width: 20 });
      });
      worksheet.columns = columns;

      // Add data rows to the worksheet
      student_details[0].forEach(row => {
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


module.exports = { AdminRegister, AdminLogin, sendVerificationCode,search,downloadStudentsInfo };
