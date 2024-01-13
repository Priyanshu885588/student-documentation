const express = require("express");
const app = express();
const cors = require("cors");
const uploadRoutes = require("./routes/uploadRoutes");
const studentRoutes = require("./routes/studentRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/admin", studentRoutes);
app.use("/api/v1/admin/upload", uploadRoutes);

app.get("/", (req, res) => {
  console.log("Reached the root route");
  res.send("Hello, Express!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
