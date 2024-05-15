const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const {
  AdminRegister,
  AdminLogin,
  sendVerificationCode,
  search,
  downloadStudentsInfo,
  deleteStudentsData,
  addNewDocument,
  getDocumentTableColumns,
} = require("../controllers/adminController");
const authenticationMiddleware = require("../middleware/auth");

router.route("/register").post(AdminRegister);
router.route("/login").post(AdminLogin);
router.route("/verification-code").post(sendVerificationCode);
router.route("/search").get(search);
router.route("/download").get(downloadStudentsInfo);
router.route("/students").get(studentController.getStudentData);
router.route("/students/search").get(studentController.search);
router.route("/students/batches").get(studentController.getAllBatches);
router.route("/students/deletedata").delete(deleteStudentsData);
router.route("/getuploadedinfo").get(studentController.get_student_data);
router.route("/addDocuments").post(addNewDocument);
router.route("/getDocumentColumnNames").get(getDocumentTableColumns);

module.exports = router;
