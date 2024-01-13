const db = require("../db/db");

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
};
