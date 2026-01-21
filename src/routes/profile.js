const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validations");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
// get -profile/view
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});
// patch-profile/edit
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    // validateEditProfileData(req);
    // if (!validateEditProfileData) {
    //   throw new Error("Invalid Edit Request.");
    // }
    const isValidRequest = validateEditProfileData(req); // Assuming this returns true/false
    if (!isValidRequest) {
      throw new Error("Invalid Edit Request.");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName},your profile has been updated`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    //validate the old password
    const { password, newPassword } = req.body;
    const loggedInUser = req.user;
    const isValidPassword = await loggedInUser.validatePassword(password);
    if (!isValidPassword) {
      throw new Error("Invalid Old Password");
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = passwordHash;
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName},your password has been updated`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

module.exports = profileRouter;
