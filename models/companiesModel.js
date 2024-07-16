import mongoose from "mongoose";
import validator from "validator";
const companySchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: [true, "company name is required Please"],
      trim: true,
      maxLength: [50, "company name can not exceed 50 characters"],
    },
    location: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required:true,
    },
    email:{
        type: String,
        required: [true,"Email is required Please"],
        trim: true,
        validate: [validator.isEmail,"Please enter a valid email"],
        unique: true,
        message:"Email Already Exists in Database"
    },
    website:{
        type: String,
        required: false,
        trim: true,
        validate: [validator.isURL,"Please enter a valid URL"],
    },
    description: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);
const Activities = mongoose.model("Company", companySchema);
export default Activities;
