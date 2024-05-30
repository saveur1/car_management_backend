import mongoose from "mongoose";
import validator from "validator";

const staffSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is required Please"],
      trim: true,
      maxLength: [30, "First Name can not exceed 30 characters"],
    },
    lastname: {
      type: String,
      required: [true, "Last Name is required Please"],
      trim: true,
      maxLength: [30, "Last Name can not exceed 30 characters"],
    },
    phoneNumber: {
      type: String,
      type: String,
      required: [true, "Phone Number is required Please"],
      trim: true,
      maxLength: [15, "Phone Number can not exceed 15 characters"],
    },
    username: {
      type: String,
      required: [true, "UserName is required Please"],
      trim: true,
      unique: true,
      maxLength: [30, "UserName can not exceed 30 characters"],
    },
    position: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Email is required Please"],
      trim: true,
      validate: [validator.isEmail, "Please enter a valid email"],
      unique: true,
      message: "Email Already Exists in Database",
    },
    idNumber: { type: String, required: true, length: 16 },
    location: { type: String, required: true },
    address: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String },
    salary: { type: Number, required: true },
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
