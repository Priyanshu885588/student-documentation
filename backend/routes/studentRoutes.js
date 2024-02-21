const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const auth = require("../middleware/auth");

router.route("/login").post(studentController.studentAuth);
router
  .route("/uploadinfo")
  .post(auth.studentAuthMiddlware, studentController.uploadStudentInfo);
router
  .route("/uploaddocuments")
  .post(auth.studentAuthMiddlware, studentController.documentsUpload);
router
  .route("/getStudentinfo")
  .get(auth.studentAuthMiddlware, studentController.getStudentDetails);
  router
  .route("/getStudentdocuments")
  .get(auth.studentAuthMiddlware, studentController.getStudentDocuments);

router.route("/getupoadedinfo").get(studentController.get_student_data)

module.exports = router;
