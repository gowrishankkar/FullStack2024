const express = require("express");
const userRouter = express.Router();
const {
  getUserHandler,
  getuserById,
  updateUserById,
  deleteUserById,
} = require("../controller/UserController");

userRouter.get("/", getUserHandler);
userRouter.get("/:id", getuserById);
userRouter.patch("/:id", updateUserById);
userRouter.delete("/:id", deleteUserById);

module.exports = userRouter;
