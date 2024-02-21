const db = require("../db/db");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const path = require('path');


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
    res.status(200).json({ rows, length: rows.length, pagesCount: pagesCount });
  } catch (error) {
    console.error("Error executing the query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const studentAuth = async (req, res) => {
  const { uniqueid, name } = req.body;
  const batch = req.query;
  if (!uniqueid || !name) {
    return res.status(400).json({
      msg: "Enter unique id and student name",
    });
  }
  try {
    const data = await db
      .promise()
      .query(`SELECT * FROM student_${batch.batch} WHERE id = ? AND name = ?`, [
        uniqueid,
        name,
      ]);
    if (data[0].length > 0) {
      const token = jwt.sign({ uniqueid, name }, process.env.JWT_SECRET);

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
  const { uniqueid } = req.user;
  const batch = req.query.batch;
  var data;

  const namequery=`select name from student_${batch} where id='${uniqueid}'`
  try {
    data = await db.promise().query(namequery);
    console.log("name received", data);
    
  } catch (error) {
    return res.status(400).json({ msg: "Something went wrong...", error });
  }
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {

      const uploadDir=path.join('C:','uploads')

      if (!fs.existsSync(uploadDir)) {
        // If not, create the directory
        fs.mkdirSync(uploadDir);
      }


      const uploadDirWithName = path.join('C:', 'uploads', data[0][0].name);
      // Check if the directory exists
      if (!fs.existsSync(uploadDirWithName)) {
        // If not, create the directory
        fs.mkdirSync(uploadDirWithName);
      }

      cb(null, uploadDirWithName);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Specify how the uploaded files will be named
    },
  });

  const upload = multer({ storage: storage });
  upload.array("documents")(req, res, async function (err) {
    if (err) {
      return res.status(500).send("invalid documents");
    }

    const uploadedFiles = req.files;
    if (uploadedFiles.length != 6) {
      return res.status(500).json({ msg: "Please enter all the documents" });
    }
    console.log(uploadedFiles);

    const filepaths = uploadedFiles.map(
      (file) => file.path
    );
    console.log(filepaths);
    const values = uploadedFiles
          .map((file) => `'${file.destination.replace(/\\/g, '/')}/${file.filename}'`)
              .join(", ");


    // Save the file paths to the database or perform other actions
    const query = `insert into student_${batch}_documents values ('${uniqueid}',${values})`;
    const query1=`UPDATE student_${batch} SET status=1 WHERE id='${uniqueid}'`;

    try {
      const [data1,data2] = await Promise.all([db.promise().query(query),db.promise().query(query1)]);
      return res.status(200).json({ msg: "documents uploaded successfully"});
    } catch (error) {
      return res.status(400).json({ msg: "Something went wrong...", error });
    }
  });
  
};

const getStudentDocuments=async(req,res)=>{
  const { uniqueid } = req.user;
  const { batch } = req.query;

  try {
    const data = await db
      .promise()
      .query(`select * from student_${batch}_documents where id = ?`, [uniqueid]);
    const studentdocuments = data[0][0];
    res.status(200).json(studentdocuments);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong...", error });
  }}

module.exports = {
  getStudentData,
  getAllBatches,
  studentAuth,
  search,
  uploadStudentInfo,
  getStudentDetails,
  documentsUpload,
  getStudentDocuments,
  get_student_data
};
