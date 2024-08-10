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
const authRouter = require("./router/authRouter");
const reviewRouter = require("./router/reviewRouter");
const bookingRouter = require("./router/bookingRouter");

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path}`);
  next();
});

app.use("/search", async function (req, res) {
  const sortQuery = req.query.sort;
  const selectQuery = req.query.select;

  let queryResPromise = Product.find();
  if (sortQuery) {
    const [sortParam, order] = sortQuery.split(" ");
    console.log("sortParam", sortParam);
    console.log("order", order);
    if (order === "asc") {
      queryResPromise = queryResPromise.sort(sortParam);
    } else {
      queryResPromise = queryResPromise.sort(`-${sortParam}`);
    }
  }
  const result = await queryResPromise;

  console.log("sort ", sortParams);
  console.log("select ", selectParams);
  res.status(200).json({
    message: "search successfull",
    data: req.query,
  });
});

app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);
app.use("/api/auth", authRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/reviews", reviewRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    status: statusCode,
    message: message,
  });
});

app.use(function (req, res) {
  res.status(404).send("404 Not Found");
});

// server
app.listen(Port, function () {
  console.log("sever is listening to port 3000");
});
