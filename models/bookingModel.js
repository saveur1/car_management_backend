import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    index: true,
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
    enum: ["confirm", "pending", "cancelled"],
    default: "pending",
  },
},
{
    timestamps: true
});


const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
