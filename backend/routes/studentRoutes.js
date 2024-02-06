const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.route("/login").post(studentController.studentAuth);
router.route("/uploadinfo").post(studentController.uploadStudentInfo);

module.exports = router;
