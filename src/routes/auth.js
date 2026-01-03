const express = require("express");
const authRouter = express.Router();
const User = require("../models/user.js");
const validator = require("validator");
const { validateSignUpData } = require("../utils/validations");
const bcrypt = require("bcrypt");

//Post - User SignUp
authRouter.post("/signup", async (req, res) => {
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

// POST-LOGIN
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Email is not Valid");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials.");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // Create a JWT Token
      const token = await user.getJWT();
      // Add the token to cookie and send the response back to the client

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Sucessful!!");
    } else {
      throw new Error("Invalid credentials.");
    }
  } catch (err) {
    res.status(400).send("Error" + err.message);
  }
});

module.exports = authRouter;
