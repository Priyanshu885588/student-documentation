const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const {
  AdminRegister,
  AdminLogin,
  sendVerificationCode,
  search,
} = require("../controllers/adminController");
const authenticationMiddleware = require("../middleware/auth");

router.route("/register").post(AdminRegister);
router.route("/login").post(AdminLogin);
router.route("/verification-code").post(sendVerificationCode);
router.route("/search").get(search);
router.route("/students").get(studentController.getStudentData);
router.route("/students/search").get(studentController.search);
router.route("/students/batches").get(studentController.getAllBatches);

module.exports = router;
