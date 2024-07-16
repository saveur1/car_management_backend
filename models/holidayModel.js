import mongoose from "mongoose";
const holidaySchema = new mongoose.Schema(
  {
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: [true, "Staff is required Please"],
    },
    reason: {
      type: String,
      required: [true, "Name of Asset is required Please"],
      trim: true,
      maxLength: [50, "Name of Asset can not exceed 50 characters"],
    },
    startDate: {
        type: Date,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        default: "66965043ad17b5897e2f6ec9"
    },
    endDate: {
        type: Date,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Holiday = mongoose.model("Holiday", holidaySchema);
export default Holiday;
