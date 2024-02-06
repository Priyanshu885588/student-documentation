const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const studentAuthMiddleware=require("../middleware/auth");

router.route("/students").get(studentController.getStudentData);
router.route("/students/search").get(studentController.search);
router.route("/students/batches").get(studentController.getAllBatches);
router.route("/login").get(studentController.studentAuth);
router.route("/uploadinfo").post(studentController.uploadStudentInfo);

module.exports = router;
