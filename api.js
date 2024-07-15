const express = require("express");
const fs = require("fs");

const app = express();
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

//   Schema
const userSchemaRules = {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8,
        // validate property 
        validate: function () {
            return this.password == this.confirmPassword
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}
const userSchema = new mongoose.Schema(userSchemaRules);
const UserModel = mongoose.model("userModel", userSchema);



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
async function createuserHandler(req, res) {
    try {
        const userDetails = req.body;
        // adding user to the file 
        const user = await UserModel.create(userDetails);

        res.status(200).json({
            status: "successfull",
            message: `added  the user `,
            user: user
        })
    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }

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
// server
app.listen(Port, function () {
  console.log("sever is listening to port 3000");
});
