const express = require("express");
const app = express();
const db = require("../db/db");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin");

const AdminRegister = async (req, res) => {
  adminModel.createAdminTable();
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    return res.status(400).json({ message: "Please enter Email and Password" });
  }
  console.log(Email, Password);
  const token = jwt.sign({ Email, Password }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  try {
    await db
      .promise()
      .query("insert into admin_table (Gmail,Password) values(?,?)", [
        Email,
        Password,
      ]);

    res
      .status(200)
      .json({ message: "Admin registred Successfuly", token: token });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const AdminLogin = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const data = await db
      .promise()
      .query("select * from admin_table where Gmail = ? && Password = ?", [
        Email,
        Password,
      ]);
    if (data[0].length > 0) {
      const token = jwt.sign({ Email, Password }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.send({ token, msg: "Admin logged in successfully" });
    } else {
      res.send({ message: "Credential don't match!!!" });
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = { AdminRegister, AdminLogin };
