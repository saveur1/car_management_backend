import mongoose from "mongoose";
const activitySchema = new mongoose.Schema(
  {
    activityName: {
      type: String,
      required: [true, "Name of Asset is required Please"],
      trim: true,
      maxLength: [50, "Name of Asset can not exceed 50 characters"],
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Staff",
      required: [true, "Staff is required Please"],
    }
  },
  {
    timestamps: true,
  }
);
const Activities = mongoose.model("Activities", activitySchema);
export default Activities;
