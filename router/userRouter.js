const express = require("express");
const userRouter = express.Router();
const {
  getUserHandler,
  getuserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/UserController");
const { protectRoute, isAdmin } = require("../controllers/authController");

userRouter.use(protectRoute);

userRouter.get("/", isAdmin, getUserHandler);
userRouter.get("/:id", getuserById);
userRouter.patch("/:id", updateUserById);
userRouter.delete("/:id", deleteUserById);

module.exports = userRouter;
