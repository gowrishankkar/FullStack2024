const express = require("express");
const fs = require("fs");

const short = require("short-uuid");
const mongoose = require("mongoose");
require("dotenv").config();

// reading the content
const strContent = fs.readFileSync("./dev-data.json", "utf-8");
const userDataStore = JSON.parse(strContent);
const DB = process.env.DATABASE;
const Port = process.env.PORT;

console.log("DB", DB, Port);
mongoose
  .connect(DB)
  .then(() => {
    console.log("conected to mongodb");
  })
  .catch((error) => {
    console.log("mongo error", error);
  });

const app = express();
const UserRouter = require("./router/userRouter");

app.use(express.json());
app.use("/api/user", UserRouter);

app.use(function (req, res, next) {
  // console.log("36",req.method);
  if (req.method == "POST") {
    // check if the body is empty or not
    const userDetails = req.body;
    const isEmpty = Object.keys(userDetails).length == 0;
    if (isEmpty) {
      res.status(400).json({
        status: "failure",
        message: "userDetails are empty",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

app.use(function cb(req, res) {
  res.status(404).json({
    status: "failer",
    message: "Route not found",
  });
});
// server
app.listen(Port, function () {
  console.log("sever is listening to port 3000");
});
