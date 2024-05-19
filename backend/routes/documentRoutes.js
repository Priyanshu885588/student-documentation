const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {GetUploadUrl} = require("../controllers/documentation")

router.route("/getUploadurl").get(auth.authenticationMiddleware,GetUploadUrl);

module.exports = router;

