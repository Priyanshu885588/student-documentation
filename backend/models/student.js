const db = require("../db/db");

const createStudentTable = (batch) => {
  const tableName = `student_${batch}`;
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      admission_category VARCHAR(255) NOT NULL,
      status BIT(1) DEFAULT 0
    )`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(`Error creating ${tableName} table:`, err.message);
    } else {
      console.log(`${tableName} table created successfully.`);
    }
  });
};

const insertStudent = (batch, name, admissionCategory) => {
  const tableName = `student_${batch}`;

  const query = `INSERT INTO ${tableName} (name, admission_category) VALUES (?, ?)`;

  db.query(query, [name, admissionCategory], (err, results) => {
    if (err) {
      console.error(`Error inserting student into ${tableName}:`, err.message);
      console.log(name);
    }
  });
};

module.exports = {
  createStudentTable,
  insertStudent,
};
