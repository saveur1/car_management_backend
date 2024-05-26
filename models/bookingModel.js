import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  carPlateNumber: {
    type: String,
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
});
//   {
//     timestamps: true,
//   }


const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
