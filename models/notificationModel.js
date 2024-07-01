import mongoose from "mongoose"
const notificationSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: false,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: false,
    },
    message: {
      type: String,
      required: true,
    },
    isread: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;