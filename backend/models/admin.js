const db = require("../db/db")


exports.createAdminTable = (req, res) => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS admin_table (
        admin_id INT PRIMARY KEY AUTO_INCREMENT,
        Gmail varchar(255) not null unique,
        Password varchar(20) not null  
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
  