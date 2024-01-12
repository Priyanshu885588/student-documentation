// src/controllers/sampleController.js
const db = require("../db/db");

exports.createTextTable = (req, res) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS text_table (
      id INT PRIMARY KEY AUTO_INCREMENT,
      content TEXT
    )
  `;

  db.query(createTableQuery, (err, results) => {
    if (err) {
      console.error("Error creating text_table:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("text_table created successfully");
      res.status(200).send("text_table created successfully");
    }
  });
};
