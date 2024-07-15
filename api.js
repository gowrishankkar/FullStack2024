const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

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
const ProductRouter = require("./router/productRouter");

app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);


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
