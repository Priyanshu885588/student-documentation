const db = require("../db/db");
const jwt = require("jsonwebtoken");

const getAllBatches = async (req, res) => {
  try {
    const [rows] = await db
      .promise()
      .query(
        "SELECT table_name FROM information_schema.tables WHERE table_name LIKE 'student_%'"
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
  const {uniqueid} = req.user

  const {     
    First_name ,
    Last_name ,
    email ,
    Phone_Number ,
    Aadhar_Number ,
    Gender , 
    date_of_birth, 
    current_address ,
    Permanent_address,
    religion ,
    category ,
    nationality ,
    state ,
    branch ,
    admission_quota ,
    registration_number_10th,
    passing_year_10th ,
    school_name_10th ,
    PUC_registration_Number,
    PUC_Passing_Number,
    PUC_college_name,
    batch
  } = req.body;
  if (
    !uniqueid ||    
    !First_name ||
    !Last_name ||
    !email||
    !Phone_Number ||
    !Aadhar_Number ||
    !Gender  ||
    !date_of_birth ||
    !current_address||
    !Permanent_address||
    !religion|| 
    !category ||
    !nationality ||
    !state ||
    !branch ||
    !admission_quota|| 
    !registration_number_10th||
    !passing_year_10th ||
    !school_name_10th ||
    !PUC_registration_Number||
    !PUC_Passing_Number||
   ! PUC_college_name
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
          First_name ,
          Last_name ,
          email ,
          Phone_Number ,
          Aadhar_Number ,
          Gender , 
          date_of_birth, 
          current_address ,
          Permanent_address,
          religion ,
          category ,
          nationality ,
          state ,
          branch ,
          admission_quota ,
          registration_number_10th,
          passing_year_10th ,
          school_name_10th ,
          PUC_registration_Number,
          PUC_Passing_Number,
          PUC_college_name,
        ]
      );
    res.status(200).json({ msg: "data uploaded successfully!!!" });
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong..." ,error});
  }
};

module.exports = {
  getStudentData,
  getAllBatches,
  studentAuth,
  search,
  uploadStudentInfo,
};
