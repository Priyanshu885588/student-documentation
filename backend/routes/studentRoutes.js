const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.route("/students").get(studentController.getStudentData);
router.route("/students/batches").get(studentController.getAllBatches);
router.route("/login").get(studentController.studentAuth);

module.exports = router;
