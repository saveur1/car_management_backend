import Staff from "../models/staffModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";
import sendToken from "../utils/sendToken.js";
import ErrorHandler from "../utils/ErrorHandler.js";

// @desc    Create new staff
// @route   POST /api/v1/staff
export const createStaff = asyncCatch(async (req, res,next) => {
   const staff = await Staff.create(req.body);
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

// @desc    Get all staff
// @route   GET /api/v1/staff
export const getAllStaff = asyncCatch(async (req, res, next) => {
    const staff = await Staff.find();
    res.status(200).json({
        success: true,
        staff
    });
});

// @desc    Get staff by ID
// @route   GET /api/v1/staff/:id
export const getStaffById = asyncCatch(async (req, res, next) => {
    const staff = await Staff.findById(req.params.id);
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
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body,{
         new: true,
          runValidators: true,
          useFindAndModify: false 
        });
    // if (!staff) {
    //     return res.status(404).json({
    //         success: false,
    //         message: 'Staff not found'
    //     });
    // }
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
    const staff = await Staff.find({ position: req.params.position });
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
    const staffs = await Staff.find({ jobType: req.params.jobtype });
     if (!staff) {
       return res.status(404).json({
         success: false,
         message: "Staff not found",
       });
     }
    res.status(200).json({
        success: true,
        staffs,
    });
});