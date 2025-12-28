const express = require("express");

const app = express();
const { connectDb } = require("./config/database");
const User = require("./models/user.js");

//Post - User SignUp
app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Virat",
    lastName: "Kohli",
    emailId: "viratKohli@gmail.com",
    password: "ViratKohli@123",
  };
  const user = new User(userObj);
  try {
    await user.save();
    res.send("User Added successfully");
  } catch (err) {
    res.status(400).send("Error Saving the user:" + err.message);
  }
});

connectDb()
  .then(() => {
    console.log("Database Connection Established");
    app.listen(3000, () => {
      console.log("Successfully Server Running");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!!");
  });
