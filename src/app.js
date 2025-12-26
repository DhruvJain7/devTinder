const express = require("express");

const app = express();
app.use("/", (req, res) => {
  res.send("Hello , Server");
});

app.use("/hello", (req, res) => {
  res.send("Hello , Hola");
});

app.use("/test", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(3000, () => {
  console.log("Successfully Running");
});
