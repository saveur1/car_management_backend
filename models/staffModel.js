import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const staffSchema = new mongoose.Schema({
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
    unique: true,
    maxLength: [15, "Phone Number can not exceed 15 characters"],
  },
  username: {
    type: String,
    required: [true, "UserName is required Please"],
    trim: true,
    unique: true,
    maxLength: [30, "UserName can not exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required Please"],
    trim: true,
    validate: [validator.isEmail, "Please enter a valid email"],
    unique: true,
    message: "Email Already Exists in Database",
  },
  password: {
    type: String,
    validate: [validator.isStrongPassword, "Enter Strong Password Please!"],
    required: true
  },
  idNumber: { 
    type: String, 
    required: true, 
    length: 16,
    unique:true 
},
  position: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "fired", "holiday"],
    default: "active"
  },
  jobType: {
    type: String,
    required: true,
    enum: ["casual", "formal","fired"],
    default: "casual"
  },
  address: { type: String, required: true },
  startDate: { type: Date, required: true },
  endingDate: { type: Date, required: true },
  description: { type: String },
  salary: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Salary",
    required: true,
},
  image: {
    type: String,
    required: true,
  },
});

//hash password before saving
staffSchema.pre("save",async function(next){
    if(!this.isModified()){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

//compare password
staffSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//generate token
staffSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

//generate password reset token
staffSchema.methods.generateResetPasswordToken = function(){
    //generate token
    const resetToken = crypto.randomBytes(3).toString("hex"); //3*2 represents Number of codes to send in email

    return resetToken;
}

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
