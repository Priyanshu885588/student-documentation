const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "student_documentation",
  password: "885588",
  database: "student_documentation",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = connection;
