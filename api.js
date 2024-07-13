const express = require("express");
const fs = require("fs");

const app = express();
const short = require("short-uuid");

// reading the content
const strContent = fs.readFileSync("./dev-data.json", "utf-8");
const userDataStore = JSON.parse(strContent);

// server

app.use(express.json());

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

app.get("/api/user", getAllUserHandler);
app.post("/api/user", createuserHandler);
app.get("/api/user/:userId", getUserById);

function getAllUserHandler(req, res) {
  try {
    console.log("I am inside  get method");

    if (userDataStore.length == 0) {
      throw new Error("No users are present");
    }
    res.status(200).json({
      status: "success",
      message: userDataStore,
    });
  } catch (err) {
    res.status(404).json({
      status: "failure",
      message: err.message,
    });
  }
}
function createuserHandler(req, res) {
  const id = short.generate();
  const userDetails = req.body;
  userDetails.id = id;
  userDataStore.push(userDetails);
  const struserStore = JSON.stringify(userDataStore);
  fs.writeFileSync("./dev-data.json", struserStore);
  res.status(200).json({
    status: "successfull",
    message: `update the user with ${id}`,
  });
}
function getUserById(req, res) {
  try {
    const userId = req.params.userId;
    const userDetails = getUserByid(userId);
    if (userDetails == "no user found") {
      throw new Error(`user with ${userId} not found`);
    } else {
      res.status(200).json({
        status: "successfull",
        message: userDetails,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "failure",
      message: err.message,
    });
  }
}

app.use(function cb(req, res) {
  res.status(404).json({
    status: "failer",
    message: "Route not found",
  });
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("sever is listening to port 3000");
});
