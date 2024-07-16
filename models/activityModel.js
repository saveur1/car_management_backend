import mongoose from "mongoose";
const activitySchema = new mongoose.Schema(
  {
    activityName: {
      type: String,
      required: [true, "Activity name is required Please"],
      trim: true,
      maxLength: [50, "Activity name can not exceed 50 characters"],
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Staff",
      required: [true, "Staff is required Please"],
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        default: "669670020f9122e001cd17bc",
        required: true
    },
    activity_cost: {
        type: Number,
        required: false
    },
    color: {
        type: String,
        default: "blue"
    },
    date: {
        type: Date,
        required:false,
    },
    status: {
        type: String,
        enum: ["Incoming", "Live", "Completed", "Cancelled"]
    },
    description: {
        type: String,
        required:false,
    }
  },
  {
    timestamps: true,
  }
);
const Activities = mongoose.model("Activities", activitySchema);
export default Activities;
