const express = require("express");

const app = express();
const { connectDb } = require("./config/database");
const User = require("./models/user.js");
const { validateSignUpData } = require("./utils/validations");
const bcrypt = require("bcrypt");
const validator = require("validator");

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
  try {
    // Validation of data
    validateSignUpData(req);
    // Encrypting Password

    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added successfully");
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

//Post -Login Api
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Email is not Valid");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials.");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login Sucessful!!");
    } else {
      throw new Error("Invalid credentials.");
    }
  } catch (err) {
    res.status(400).send("Error" + err.message);
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

// delete a user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted Successfully !!!");
  } catch (err) {
    res.status(400).send("Something went wrong!!");
  }
});

// update a user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdatedAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isUpdatedAllowed) {
      throw new Error("Update not allowed.");
    }
    if (data?.skills.length > 10) {
      throw new Error("Maximum 10 skills allowed.");
    }
    await User.findByIdAndUpdate(userId, data, { runValidators: true });
    res.send("User Updated!!");
  } catch (err) {
    res.status(400).send("Something Went Wrong!" + err.message);
  }
});

//update a user by email
app.patch("/email", async (req, res) => {
  const emailId = req.body.emailId;
  const data = req.body;
  try {
    await User.findOneAndUpdate({ emailId: emailId }, data, {
      runValidators: true,
    });
    res.send("User Updated!!");
  } catch (err) {
    res.status(400).send("Something Went Wrong!" + err.message);
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
