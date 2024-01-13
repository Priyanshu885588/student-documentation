const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/").post(
  (req, res, next) => {
    console.log("Reached /upload route");
    next(); // Pass control to the next middleware (upload.single)
  },
  upload.single("excelFile"),
  (req, res) => {
    console.log("Reached /upload route after file upload");

    // Call the controller function for handling Excel file upload
    uploadController.uploadExcel(req, res);
  }
);

module.exports = router;
