const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookedAt: {
    type: Date,
    default: Date.now,
  },
  priceAtBooking: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "confirmed",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: [String],
    ref: "Product",
    required: true,
  },
  paymentOrderId: String,
});

const bookingModel = mongoose.model("Booking", bookingSchema);
module.exports = bookingModel;
