const Razorpay = require("razorpay");
const crypto = require("crypto");
const bookingModel = require("../models/bookingModel");
const User = require("../models/userModel");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const formatBookingPayload = (userId, body) => ({
  user: userId,
  product: body.product,
  priceAtBooking: body.priceAtBooking,
  status: "pending",
});

const createBooking = async (req, res, next) => {
  try {
    const userId = req.userId;
    const bookingPayload = formatBookingPayload(userId, req.body);

    const booking = new bookingModel(bookingPayload);
    await booking.save();

    const amountInPaise = parseInt(bookingPayload.priceAtBooking * 100, 10);

    try {
      const order = await razorpayInstance.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: booking._id.toString(),
      });

      booking.paymentOrderId = order.id;
      await booking.save();

      res.status(200).json({
        status: "success",
        message: {
          id: order.id,
          currency: order.currency,
          amount: order.amount,
        },
        bookingId: booking._id,
      });
    } catch (orderError) {
      await bookingModel.deleteOne({ _id: booking._id });
      throw orderError;
    }
  } catch (error) {
    next(error);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const allBookings = await bookingModel
      .find()
      .populate({ path: "user", select: "name email" })
      .populate({ path: "product", select: "name price" });

    res.status(200).json({
      message: "success",
      data: allBookings,
    });
  } catch (error) {
    next(error);
  }
};

const getBookingsForUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const userBookings = await bookingModel
      .find({ user: userId, status: "confirmed" })
      .populate({ path: "user", select: "name email" })
      .populate({ path: "product", select: "name price" })
      .sort({ bookedAt: -1 });

    res.status(200).json({
      message: "success",
      data: userBookings,
    });
  } catch (error) {
    next(error);
  }
};

const verifyBookingPayment = async (req, res, next) => {
  try {
    const webhookSecret = process.env.WEBHOOK_SECRET;

    if (!webhookSecret) {
      return res.status(500).json({
        status: "error",
        message: "Webhook secret is not configured",
      });
    }

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const freshSignature = shasum.digest("hex");

    if (freshSignature !== req.headers["x-razorpay-signature"]) {
      return res.status(400).json({
        status: "error",
        message: "Invalid signature",
      });
    }

    const booking = await bookingModel.findOne({
      paymentOrderId: req.body.payload.payment.entity.order_id,
    });

    if (!booking) {
      return res.status(404).json({
        status: "error",
        message: "Booking not found",
      });
    }

    booking.status = "confirmed";
    booking.paymentOrderId = undefined;
    booking.bookedAt = new Date();
    await booking.save();

    const user = await User.findById(booking.user);
    if (user) {
      const alreadyLinked = user.bookings.some(
        (id) => id.toString() === booking._id.toString()
      );
      if (!alreadyLinked) {
        user.bookings.push(booking._id);
        await user.save();
      }
    }

    res.json({
      status: "ok",
    });
  } catch (error) {
    next(error);
  }
};

const verifyBookingPaymentClient = async (req, res, next) => {
  try {
    const { paymentOrderId, paymentId, signature } = req.body;
    const razorpaySecret = process.env.RAZORPAY_SECRET_KEY;

    if (!razorpaySecret) {
      return res.status(500).json({
        status: "error",
        message: "Payment secret is not configured",
      });
    }

    const generatedSignature = crypto
      .createHmac("sha256", razorpaySecret)
      .update(`${paymentOrderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({
        status: "error",
        message: "Invalid payment signature",
      });
    }

    const booking = await bookingModel.findOne({ paymentOrderId });

    if (!booking) {
      return res.status(404).json({
        status: "error",
        message: "Booking not found",
      });
    }

    booking.status = "confirmed";
    booking.paymentOrderId = undefined;
    booking.bookedAt = new Date();
    await booking.save();

    const user = await User.findById(booking.user);
    if (user) {
      const alreadyLinked = user.bookings.some(
        (id) => id.toString() === booking._id.toString()
      );
      if (!alreadyLinked) {
        user.bookings.push(booking._id);
        await user.save();
      }
    }

    res.json({
      status: "ok",
      bookingId: booking._id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingsForUser,
  verifyBookingPayment,
  verifyBookingPaymentClient,
};
