const express = require("express");
const fs = require('fs');
const multer=require('multer');

const exceljs = require("exceljs");
const studentModel = require("../models/student");

const uploadExcel = (req, res) => {
  console.log("Reached uploadExcel function",req.body.batch);
  if (!req.file || !req.body.batch) {
    return res
      .status(400)
      .json({ message: "Batch information or Excel file not provided." });
  }

  const batch = req.body.batch;
  const workbook = new exceljs.Workbook();
  const excelFile = req.file.buffer;

  workbook.xlsx.load(excelFile).then(() => {
    // Create the student table based on the batch
    studentModel.createStudentTable(batch);

    const worksheet = workbook.getWorksheet(1);

    // Iterate through rows starting from the second row
    console.log("row count =",worksheet.rowCount);
    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      if(isEmptyRow(row)) {
        continue;
      }
      const name = row.getCell("B").text?.toString().trim(); // Assuming name is in column B
      const admissionCategory = row.getCell("C").text?.toString().trim(); // Assuming admission category is in column C
      const Email = row.getCell("D").text?.toString(); // Assuming Email is in column D

      // Insert data into the corresponding table based on the batch
      studentModel.insertStudent(batch, name, admissionCategory, Email);
      
    }
    studentModel.createStudentDetailsTable(batch);
    studentModel.createStudentDocumentsTable(batch);

    res.status(200).json({ message: "Data imported successfully." });
  });
};


const isEmptyRow = (row) => {
  return row.values.slice(1).every(cell => !cell || cell.toString().trim() === '');
};



module.exports = {
  uploadExcel,

};
