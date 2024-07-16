import mongoose from "mongoose"
const notificationSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: false,
    },
    title: {
        type: String,
        required: true,
    },
    message: {
      type: String,
      required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        default: "669670020f9122e001cd17bc",
        required: true
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