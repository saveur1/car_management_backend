import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  pickUpDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  additionalComment: {
    type: String,
  },
  bookingStatus: {
    type: String,
    enum: ["confirm", "pending", "canceled"],
    default: "pending",
  },
},
{
    timestamps: true
});


const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
