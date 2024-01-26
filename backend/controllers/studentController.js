const db = require("../db/db");

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
  if (!uniqueid || !name) {
    return res.status(400).json({
      msg: "Enter unique id and student name",
    });
  }

  res.cookie("uniqueid", uniqueid);
  res.cookie("name", name);

  try {
    const data = await db
      .promise()
      .query(
        "SELECT * FROM student_2026 WHERE name like ? AND unique_Id like ?",
        [name, uniqueid]
      );
    console.log(data[0][0]);
    if (data[0].length > 0) {
      res.status(400).json({ msg: "Student logged in successfully" });
    } else {
      res.status(400).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    res.status(200).json({
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

module.exports = {
  getStudentData,
  getAllBatches,
  studentAuth,
  search,
};
