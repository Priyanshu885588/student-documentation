const express = require("express");
const app = express();
const sampleController = require("./controllers/sampleController");

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/hello", sampleController.createTextTable);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
