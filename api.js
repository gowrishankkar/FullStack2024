const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

/**routers */

const cookieParser = require("cookie-parser");
const cors = require("cors");

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


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})

// Apply the rate limiting middleware to all requests.

const app = express();
const UserRouter = require("./router/userRouter");
const ProductRouter = require("./router/productRouter");
const authRouter = require("./router/authRouter");
const reviewRouter = require("./router/reviewRouter");
const bookingRouter = require("./router/bookingRouter");

app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(cors({ origin: true, credentials: true }));
app.use(limiter)
app.use(mongoSanitize());

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
