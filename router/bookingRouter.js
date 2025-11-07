const express = require("express");
const {
  createBooking,
  getAllBookings,
  getBookingsForUser,
  verifyBookingPayment,
  verifyBookingPaymentClient,
} = require("../controllers/bookingController");
const { protectRoute } = require("../controllers/authController");

const bookingRouter = express.Router();

bookingRouter.post("/verify", verifyBookingPayment);
bookingRouter.post("/verify-client", verifyBookingPaymentClient);

bookingRouter.use(protectRoute);

bookingRouter.post("/", createBooking);
bookingRouter.get("/", getAllBookings);
bookingRouter.get("/user/:userId", getBookingsForUser);

module.exports = bookingRouter;
