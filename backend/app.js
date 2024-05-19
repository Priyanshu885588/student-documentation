require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const uploadRoutes = require("./routes/uploadRoutes");
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const documentRoutes = require("./routes/documentRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/admin/upload", uploadRoutes);
app.use("/api/v1/admin/", adminRoutes);
app.use("/api/v1/", studentRoutes);
app.use("/api/v1/document",documentRoutes);

app.get("/", (req, res) => {
  console.log("Reached the root route");
  res.send("Hello, Express!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
