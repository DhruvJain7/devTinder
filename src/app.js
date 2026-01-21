const express = require("express");
const app = express();
const { connectDb } = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     optionsSuccessStatus: 204,
//   }),
//);
app.use(
  cors({
    origin: "http://localhost:5173",

    // methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    //   optionsSuccessStatus: 200,
    //   allowedHeaders: ["Content-Type", "Authorization"], // Some browsers choke on 204
    // }),
  }),
);

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use(express.json());
app.use(cookieParser());

//Routers
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
