const express = require("express");
const app = express();
const sampleController = require("./controllers/sampleController");
const uploadRoutes = require("./routes/uploadRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log middleware for all incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use("/upload", uploadRoutes);

app.get("/", (req, res) => {
  console.log("Reached the root route");
  res.send("Hello, Express!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
