const db = require("../db/db");
const ShortUniqueId = require("short-unique-id");

const createStudentTable = (batch) => {
  const tableName = `student_${batch}`;
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
      id VARCHAR(8) ,
      name VARCHAR(255) NOT NULL,
      admission_category VARCHAR(255) NOT NULL,
      status BIT(1) DEFAULT 0,
      insertion_order INT AUTO_INCREMENT,
      UNIQUE KEY insertion_order_unique (insertion_order),
      PRIMARY KEY (id,name)
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


const createStudentDetailsTable = (batch)=>{

  const table_name=`student_${batch}_details`
  const query=`CREATE TABLE IF NOT EXISTS ${table_name}(
    id VARCHAR(8),
    name VARCHAR(255),
    dob date,
    phoneno VARCHAR(20),
    branch VARCHAR(4),
    email VARCHAR(255),
    gender ENUM('M','F'), 
    religion VARCHAR(50),
    caste VARCHAR(50),
    nationality VARCHAR(50),
    state VARCHAR(50),
    address VARCHAR(255),
    scheme int,

    FOREIGN KEY(id) REFERENCES student_${batch}(id)

  )`;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error(`Error creating ${table_name} table:`, err.message);
    } else {
      console.log(`${table_name} table created successfully.`);
    }
  });

}

module.exports = {
  createStudentTable,
  insertStudent,
  createStudentDetailsTable
};
