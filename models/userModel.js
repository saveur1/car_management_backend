import mongoose from "mongoose";
import validator from "validator";


const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: [true,"First Name is required Please"],
        trim: true,
        maxLength:[30,"First Name can not exceed 30 characters"]
    },
    last_name:{
        type: String,
        required: [true,"Last Name is required Please"],
        trim: true,
        maxLength:[30,"Last Name can not exceed 30 characters"]
    },
    email:{
        type: String,
        required: [true,"Email is required Please"],
        trim: true,
        validate: [validator.isEmail,"Please enter a valid email"],
        unique: true,
        message:"Email Already Exists in Database"
    },
    username:{
        type: String,
        required: [true,"UserName is required Please"],
        trim: true,
        unique: true,
        maxLength:[30,"UserName can not exceed 30 characters"]
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        default: "669670020f9122e001cd17bc",
        required: true
    },
    location:{
        type: String,
        required: [true,"Your location is required Please"],
        maxLength:[100,"Location can not exceed 100 characters"]
    },
    phone_number:{
        type: String,
        required: [true,"Phone Number is required Please"],
        trim: true,
        maxLength:[15,"Phone Number can not exceed 15 characters"]
    },
    national_id:{
        type: String,
        required: [true,"National ID is required Please"],
        trim: true,
        maxLength:[20,"National ID can not exceed 20 characters"],
        unique: true
    },
    avatar:{
            type: String,
            default: "https://res.cloudinary.com/dpwzlkjbo/image/upload/f_auto,q_auto/v1/staff/s1gc2yiili1tsiyaybsr"
    },
    categories:{
        type: String,
        enum:["individual", "government","international","private"],
        index: true
    },
    role:{
        type: String,
        required: [true,"Role is required Please"],
        trim: true,
        enum: ["customer","supplier"],
        default:"customer",
        index: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpires:{
        type: Date
    }
});


export default mongoose.model("User",userSchema);