const express = require("express");
const router = express.Router();


const {temp} = require("../controllers/documentation")

router.route("/getUploadurl").get(temp);

module.exports = router;

