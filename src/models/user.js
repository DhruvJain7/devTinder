const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      minLength: 4,
      maxLength: 50,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password:" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others", "Male", "Female", "Others", ""],
        message: `{Value} is not a valid gender type`,
      },
    },

    photoUrl: {
      type: String,
      default:
        "https://imgs.search.brave.com/x8jah8UjhG41izgdyJ4ZHffs-1p4QtG-Mf9fPg_kIQw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/aWNvbnM4LmNvbS9u/b2xhbi8xMjAwL3Vz/ZXItZGVmYXVsdC5q/cGc",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL" + value);
        }
      },
    },
    about: {
      type: String,
      default: "This a default value",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "devTinder@777", {
    expiresIn: "7d",
  });
  return token;
};
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash,
  );
  return isPasswordValid;
};
module.exports = mongoose.model("User", userSchema);
