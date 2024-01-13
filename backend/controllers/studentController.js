const db = require("../db/db");

const getStudentData = async (req, res) => {
  try {
    const { batch } = req.body;
    const [rows] = await db.promise().query(`SELECT * FROM student_${batch}`);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error executing the query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getStudentData,
};
