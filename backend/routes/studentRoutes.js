const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.route("/students").get(studentController.getStudentData);

module.exports = router;
