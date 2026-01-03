const express = require("express");
const app = express();
const { connectDb } = require("./config/database");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use(express.json());
app.use(cookieParser());

//Routers
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
