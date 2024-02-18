const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const auth = require("../middleware/auth");

router.route("/login").post(studentController.studentAuth);
router
  .route("/uploadinfo")
  .post(auth.studentAuthMiddlware, studentController.uploadStudentInfo);

module.exports = router;
