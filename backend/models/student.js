const db = require("../db/db");
const ShortUniqueId = require("short-unique-id");

const createStudentTable = (batch) => {
  const tableName = `student_${batch}`;
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
      id VARCHAR(8) PRIMARY KEY,
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
const { randomUUID } = new ShortUniqueId({ length: 8 });
const insertStudent = (batch, name, admissionCategory) => {
  const tableName = `student_${batch}`;

  const uniqueId = randomUUID(); // Generate an 8-character ID

  const query = `INSERT INTO ${tableName} (id, name, admission_category) VALUES (?, ?, ?)`;

  db.query(query, [uniqueId, name, admissionCategory], (err, results) => {
    if (err) {
      console.error(`Error inserting student into ${tableName}:`, err.message);
    } else {
      console.log(
        `Student inserted into ${tableName} successfully with ID: ${uniqueId}`
      );
    }
  });
};

module.exports = {
  createStudentTable,
  insertStudent,
};
