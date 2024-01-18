const express = require("express");
const router = express.Router();
const {
  AdminRegister,
  AdminLogin,
  sendVerificationCode,
} = require("../controllers/adminController");
const authenticationMiddleware = require("../middleware/auth");

router.route("/register").post(AdminRegister);
router.route("/login").post(AdminLogin);
router.route("/verification-code").post(sendVerificationCode);

module.exports = router;
