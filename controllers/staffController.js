import Staff from "../models/staffModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";
import sendToken from "../utils/sendToken.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";
import sendEmail from "../utils/sendEmail.js";
import { emailFormat } from "../config/emailDoc.js";
import schedule from "node-schedule";
import { staffEmail } from "../config/staffEmailTemplate.js";
import Activities from "../models/activityModel.js";
import Position from "../models/jobsModel.js";

// @desc    Create new staff
// @route   POST /api/v1/staff
export const createStaff = asyncCatch(async (req, res, next) => {

  const staffToAdd = {
    ...req.body,
    company: req.staff.company
  };

  //If there is file then add its url to staff data
  if (req.file) {
    const cloudinary_image = await cloudinary.v2.uploader.upload(
      req.file.path,
      {
        folder: "staff",
        unique_filename: false,
        use_filename: true,
      }
    );

    staffToAdd["image"] = cloudinary_image.secure_url;
  }

  //Save staff in database
  const staff = await Staff.create(staffToAdd);

  //send email with password and email address
  //this function will run in background
  const position = await Position.findById(staff.position);
  const allowedPositions = ["admin", "human_resources", "accountant", "operators", "manager","CEO"]; //excludes other positions form receiving email

  if(allowedPositions.includes(position.job_title)) {
    const job = schedule.scheduleJob( "send staff email", { start: new Date() }, async function () {
        await sendEmail({
            email: req.body.email,
            subject: "Welcome to Techspherelabs",
            message: staffEmail(
            req,
            req.body.email,
            req.body.password,
            `${req.body.firstname} ${req.body.lastname}`
            ),
        });

        job.cancel();
        }
    );
}

  //add new activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Created Staff",
    company: req.staff.company,
    color: "blue"
  });

  res.status(200).json({
    success: true,
    staff,
  });
});


//Login Staff => /api/v1/staff/login
export const loginStaff = asyncCatch(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password are set
  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required", 400));
  }

  //check if email is in database
  const staff = await Staff.findOne({ email })
    .select("+password")
    .populate("position");

  if (!staff) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  //check if password is in databse
  const isMatch = await staff.comparePassword(password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  if(staff.status == "fired"){
    return next(new ErrorHandler("You are not allowed to Loggin!", 401));
  }

  staff.password = undefined;

  sendToken(200, staff, res);
});

//User forgot password => /api/v1/staff/password/forgot
export const userForgotPassword = asyncCatch(async (req, res, next) => {
  const { email } = req.body;

  //getting staff information
  const staff = await Staff.findOne({ email }).select("+password");

  if (!staff) {
    return next(
      new ErrorHandler("Provided User Email Doesn't match Any in Database", 404)
    );
  }

  //get staff token
  const resetCode = staff.generateResetPasswordToken();

  await Staff.findByIdAndUpdate(
    staff._id,
    {
      resetPasswordCode: resetCode,
      resetPasswordExpires: Date.now() + 30 * 60 * 1000,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  const message = emailFormat(resetCode, staff.firstname, staff.lastname);

  try {
    await sendEmail({
      email: email,
      subject: "Car Rent Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email Sent To: ${email}`,
    });
  } catch (error) {
    staff.resetPasswordCode = undefined;
    staff.resetPasswordExpires = undefined;

    await staff.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//Staff reset password => /api/v1/staff/password/reset
export const userResetPassword = asyncCatch(async (req, res, next) => {
  const resetToken = req.body.resetCode;

  const staff = await Staff.findOne({
    resetPasswordCode: resetToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!staff) {
    return next(
      new ErrorHandler("Password reset code is invalid or has expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  staff.resetPasswordCode = undefined;
  staff.resetPasswordExpires = undefined;

  staff.password = req.body.password;

  await staff.save();

  sendToken(200, staff, res);
});

// Get user profile of logged user => /api/v1/staff/profile
export const getUserProfile = asyncCatch(async (req, res, next) => {
  res.status(200).json({
    success: true,
    staff: req.staff,
  });
});

//Update Staff password => /api/v1/staff/password/update

export const updateUserPassword = asyncCatch(async (req, res, next) => {
  const staff = await Staff.findById(req.staff._id).select("+password");

  //compare if old password match to what is in database;
  const isMatch = await staff.comparePassword(req.body.oldPassword);

  if (!isMatch) {
    return next(new ErrorHandler("Existing Password is Incorrect", 400));
  }

  staff.password = req.body.password;

  await staff.save();

  sendToken(200, staff, res);
});

// @desc    Get all staff
// @route   GET /api/v1/staff
export const getAllStaff = asyncCatch(async (req, res, next) => {
  const staff = await Staff.find({ company: req.staff.company })
                            .populate("position")
                            .sort({ _id: -1 })
                            .select("-password");
  res.status(200).json({
    success: true,
    staff,
  });
});

// @desc    Get staff by ID
// @route   GET /api/v1/staff/:id
export const getStaffById = asyncCatch(async (req, res, next) => {
  const staff = await Staff.findById(req.params.id)
                    .populate("position")
                    .select("-password");

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

// @desc    Get staff by email
// @route   GET /api/v1/staff/:id
export const getStaffEmail = asyncCatch(async (req, res, next) => {
    const staff = await Staff.findOne({email: req.body.email, company: req.staff.company })
                      .populate("position")
                      .select("-password");
  
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

// @desc    Update staff by ID
// @route   PUT /api/v1/staff/:id
export const updateStaffById = asyncCatch(async (req, res, next) => {
  const staffToUpdate = {
    ...req.body,
  };

  if (req.file) {
    const cloudinary_image = await cloudinary.v2.uploader.upload(
      req.file.path,
      {
        folder: "staff",
        unique_filename: false,
        use_filename: true,
      }
    );

    staffToUpdate["image"] = cloudinary_image.secure_url;
  }
  const staff = await Staff.findByIdAndUpdate(req.params.id, staffToUpdate, {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            })
            .populate("position")
            .sort({ _id: -1 })
            .select("-password");
    

  //update activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Updated Staff",
    company: req.staff.company,
    color: "yellow"
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
      message: "Staff not found",
    });
  }

  //delete all resources created by staff
  //delete all activities for that staff
  //delete all holidays for that staff

  //add new activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Deleted Staff",
    company: req.staff.company,
    color: "red"   //this color is used at frontend to style bullet point of activity
  });

  res.status(200).json({
    success: true,
    message: "Staff deleted",
  });
});

// @desc    Get staff by position
// @route   GET /api/v1/staff/position/:position
export const getStaffByPosition = asyncCatch(async (req, res, next) => {
  const staff = await Staff.find({ position: req.params.position, company: req.staff.company })
                            .populate("position")
                            .sort({ _id: -1 })
                            .select("-password");
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
  const staffs = await Staff.find({ jobType: req.params.jobtype, company: req.staff.company })
                            .populate("position")
                            .sort({ _id: -1 })
                            .select("-password");

  res.status(200).json({
    success: true,
    staffs,
  });
});
