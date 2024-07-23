import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  //Booking Car
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    default: "669670020f9122e001cd17bc",
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
    enum: ["confirm", "pending", "cancelled","expired","completed"],
    default: "pending",
  },
  description: {
    type: String,
  },

  //Booking Deriver
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: false
  },
  fromLocation: {
    type: String,
  },
  toLocation: {
    type: String,
  },
  passenger: {
    type: String,
  },

  //Two field for notifications
  pickup_notify: {
    type: Boolean,
    default: false
  },
  returndate_notify: {
    type: Boolean,
    default: false
  }
},
{
    timestamps: true
});


const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
