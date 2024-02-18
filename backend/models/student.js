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

const createStudentDetailsTable = (batch) => {
  const table_name = `student_${batch}_details`;
  const query = `CREATE TABLE IF NOT EXISTS ${table_name}(
    id VARCHAR(8),
    First_name VARCHAR(255),
    Last_name VARCHAR(255),
    email VARCHAR(255),
    Phone_Number VARCHAR(255),
    Aadhar_Number VARCHAR(255),
    Gender VARCHAR(255), 
    date_of_birth date,
    current_address VARCHAR(255),
    Permanent_address VARCHAR(255),
    religion VARCHAR(255),
    category VARCHAR(255),
    nationality VARCHAR(255),
    state VARCHAR(255),
    branch VARCHAR(255),
    admission_quota VARCHAR(255),
    registration_number_10th VARCHAR(255),
    passing_year_10th VARCHAR(255),
    school_name_10th VARCHAR(255),
    PUC_registration_Number VARCHAR(255),
    PUC_Passing_Number VARCHAR(255),
    PUC_college_name VARCHAR(255),
    FOREIGN KEY(id) REFERENCES student_${batch}(id)
  );`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(`Error creating ${table_name} table:`, err.message);
    } else {
      console.log(`${table_name} table created successfully.`);
    }
  });
};

module.exports = {
  createStudentTable,
  insertStudent,
  createStudentDetailsTable,
};

// {
//   "First_name": "Priyanshu",
//   "Last_name": "Mandani",
//   "email": "priyanshumandani978@gmail.com",
//   "Phone_Number": "9313032978",
//   "Aadhar_Number": "898988889898",
//   "Gender": "Male",
//   "date_of_birth": "2003-11-20",
//   "current_address": "RR nagar,channsandra road",
//   "Permanent_address": "RR nagar,channsandra road",
//   "religion": "HINDU",
//   "category": "PATEL",
//   "nationality": "INDIAN",
//   "state": "KARNATAKA",
//   "branch": "Computer Engineering",
//   "admission_quota": "COMEDK",
//   "registration_number_10th": "ttsgs",
//   "passing_year_10th": "2019",
//   "school_name_10th": "SSMS",
//   "PUC_registration_Number": "sfdfs",
//   "PUC_Passing_Number": "2021",
//   "PUC_college_name": "SSMS"
// }
