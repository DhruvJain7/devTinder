const express = require("express");

const app = express();
const { connectDb } = require("./config/database");
const User = require("./models/user.js");
app.use(express.json());
// get user by email
app.get("/email", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    await User.find({ emailId: userEmail });
    res.send(userEmail);
  } catch {
    res.status(400).send("Something went wrong!");
  }
});
//Post - User SignUp
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added successfully");
  } catch (err) {
    res.status(400).send("Error Saving the user:" + err.message);
  }
});
// get - all profiles feed
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
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
