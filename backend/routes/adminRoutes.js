const express = require("express");
const router = express.Router();
const {
  AdminRegister,
  AdminLogin,
  sendVerificationCode,
  search
} = require("../controllers/adminController");
const authenticationMiddleware = require("../middleware/auth");

router.route("/register").post(AdminRegister);
router.route("/login").post(AdminLogin);
router.route("/verification-code").post(sendVerificationCode);
router.route("/search").get(search);

module.exports = router;
