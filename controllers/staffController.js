import Staff from "../models/staffModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";
import sendToken from "../utils/sendToken.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";
import Salary from "../models/salariesModel.js";
import sendEmail from "../utils/sendEmail.js";

// @desc    Create new staff
// @route   POST /api/v1/staff
export const createStaff = asyncCatch(async (req, res,next) => {
    const staffToAdd = {
        ...req.body
    }

    if(req.file){
        const cloudinary_image = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "staff",
            unique_filename: false,
            use_filename: true
        });

        staff["image"] = cloudinary_image.secure_url;
    }

   //Save staff in database
   const staff = await Staff.create(staffToAdd);

   //add to salaries
   const salary = await Salary.findById(req.body.salary);
   salary.employee.push(staff._id);
   await salary.save();

   
   //send email to user for password


    res.status(200).json({
      success: true,
      staff
    });

});

//Login Staff => /api/v1/login
export const loginStaff = asyncCatch(async(req,res,next)=>{
    const {email,password} = req.body;

    //check if email and password are set
    if(!email || !password){
        return next(new ErrorHandler("Email and password are required",400));
    }

    //check if email is in database
    const staff = await Staff.findOne({email}).select("+password");

    if(!staff){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    //check if password is in databse
    const isMatch = await staff.comparePassword(password);

    if(!isMatch){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    staff.password = undefined;

    sendToken(200,staff,res);
});

//User forgot password => /api/v1/password/forgot
export const userForgotPassword = asyncCatch(async(req,res,next)=>{

    const { email } = req.body;

    //getting staff information
    const staff = await Staff.findOne({email}).select("+password");

    if(!staff){
        return next(new ErrorHandler("Provided User Email Doesn't match Any in Database",404));
    }

    //get staff token
    const resetCode = staff.generateResetPasswordToken();

    await staff.save({ validateBeforeSave:false });

    //generate reset link
    // const link = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    
    const message = 
    `<h2 style='color:blue;'>Need to reset your password?</h2>
     <p>Use your secret code!</p>
     <p style='font-style:italic;font-weight:bold;padding:20px;margin-left:30px'>${ resetCode }</p>
     <p>If you did not forget your password, you can ignore this email.</p>`;
    
    try {

        await sendEmail({
            email:email,
            subject:"Car Rent Password Recovery",
            message
        });

        res.status(200).json({
            success:true,
            message:`Email Sent To: ${email}`
        })
        
    } catch (error) {
        staff.resetPasswordToken = undefined;
        staff.resetPasswordExpires = undefined;

        await staff.save({validateBeforeSave:false});
        
        return next(new ErrorHandler(error.message,500));
    }
});

// @desc    Get all staff
// @route   GET /api/v1/staff
export const getAllStaff = asyncCatch(async (req, res, next) => {
    const staff = await Staff.find()
                             .populate("position")
                             .populate("salary")
                             .sort({ _id: -1});
    res.status(200).json({
        success: true,
        staff
    });
});

// @desc    Get staff by ID
// @route   GET /api/v1/staff/:id
export const getStaffById = asyncCatch(async (req, res, next) => {
    const staff = await Staff.findById(req.params.id)
                             .populate("position")
                             .populate("salary");
    if (!staff) {
        return res.status(404).json({
            success: false,
            message: 'Staff not found'
        });
    }
    res.status(200).json({
        success: true,
        staff,
    });
});

// @desc    Update staff by ID
// @route   PUT /api/v1/staff/:id
export const updateStaffById = asyncCatch(async (req, res, next) => {
    const staffToUpdate = {
        ...req.body
    }

    if(req.file){
        const cloudinary_image = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "staff",
            unique_filename: false,
            use_filename: true
        });

        staff["image"] = cloudinary_image.secure_url;

    }
    const staff = await Staff.findByIdAndUpdate(req.params.id, staffToUpdate ,{
          new: true,
          runValidators: true,
          useFindAndModify: false 
        });

    res.status(200).json({
        success: true,
        staff,
    });
});

// @desc    Delete staff by ID
// @route   DELETE /api/v1/staff/:id
export const deleteStaffById = asyncCatch(async (req, res, next) => {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) {
        return res.status(404).json({
            success: false,
            message: 'Staff not found'
        });
    }
    res.status(200).json({
        success: true,
        message: 'Staff deleted'
    });
});

// @desc    Get staff by position
// @route   GET /api/v1/staff/position/:position
export const getStaffByPosition = asyncCatch(async (req, res, next) => {
    const staff = await Staff.find({ position: req.params.position })
                             .populate("position")
                             .populate("salary")
                             .sort({ _id: -1});
     if (!staff) {
       return res.status(404).json({
         success: false,
         message: "Staff not found",
       });
     }
    res.status(200).json({
        success: true,
        staff,
    });
});

// @route   GET /api/v1/staff/jobtype/:jobtype
export const getStaffByJobType = asyncCatch(async (req, res, next) => {
    const staffs = await Staff.find({ jobType: req.params.jobtype })
                              .populate("position")
                              .populate("salary")
                              .sort({ _id: -1});
     
    res.status(200).json({
        success: true,
        staffs,
    });
});