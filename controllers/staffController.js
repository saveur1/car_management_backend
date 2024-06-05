import Staff from "../models/staffModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";

// @desc    Create new staff
// @route   POST /api/v1/staff
export const createStaff = asyncCatch(async (req, res,next) => {
   const staff = await Staff.create(req.body);
    res.status(200).json({
      success: true,
      staff
    });

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
