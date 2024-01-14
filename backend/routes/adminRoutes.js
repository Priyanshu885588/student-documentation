const express = require("express");
const router = express.Router();
const {AdminRegister, AdminLogin} = require("../controllers/adminController")
const authenticationMiddleware = require("../middleware/auth")

router.route("/register").post(AdminRegister);
router.route("/login").post(authenticationMiddleware,AdminLogin);

module.exports = router;
