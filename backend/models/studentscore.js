const mongoose = require("mongoose");

const AnalysisInfo = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  analysedinfo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("AnalysisInfo", AnalysisInfo);
