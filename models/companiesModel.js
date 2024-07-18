import mongoose from "mongoose";
import validator from "validator";
const companySchema = new mongoose.Schema(
  {
    company_logo: {
        type: String,
        required: false
    },
    company_name: {
      type: String,
      required: [true, "company name is required Please"],
      trim: true,
      maxLength: [50, "company name can not exceed 50 characters"],
    },
    location: {
        type: String,
        required: [true, "company Location is required Please"],
    },
    phone_number: {
        type: String,
        required:[true, "Company phone number is required Please"],
    },
    email:{
        type: String,
        required: [true,"Email is required Please"],
        trim: true,
        validate: [validator.isEmail,"Please enter a valid email"],
        unique: true,
        message:"Email Already Exists in Database"
    },
    status: {
        type: String,
        enum: ["active", "not-active"],
        default: "active"
    },
    description: {
        type: String,
        required: [true, "company description is required Please"],
    }
  },
  {
    timestamps: true,
  }
);
const Activities = mongoose.model("Company", companySchema);
export default Activities;
