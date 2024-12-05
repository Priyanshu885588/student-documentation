const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  GetUploadUrl,
  getPDFFromS3,
  getAllanalyzedData,
} = require("../controllers/documentation");

router.route("/getUploadurl").get(auth.authenticationMiddleware, GetUploadUrl);
router.route("/pdf").get(auth.authenticationMiddleware, getPDFFromS3);
router.route("/getanalyzedata").get(getAllanalyzedData);

module.exports = router;
