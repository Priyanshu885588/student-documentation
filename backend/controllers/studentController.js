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
    const { batch } = req.query;
    const [rows] = await db
      .promise()
      .query(`SELECT * FROM student_${batch.batch}`);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error executing the query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getStudentData,
  getAllBatches,
};
