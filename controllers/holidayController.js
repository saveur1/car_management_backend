import Holiday from "../models/holidayModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";


// Create a new holiday
export const createHoliday = asyncCatch(async (req, res) => {
  const holiday = new Holiday(req.body);
  await holiday.save();
  res.status(201).json({
    success: true,
    holiday,
  });
});
// Get all holidays
export const getAllHolidays = asyncCatch(async (req, res) => {
  const holidays = await Holiday.find().populate("staff");
  res.status(200).json({
    success: true,
    holidays,
  });
});

// Get holiday by staff ID
export const getHolidaysByStaff = asyncCatch(async (req, res) => {
  const { staffId } = req.params;
  const holidays = await Holiday.find({ staff: staffId }).populate("staff");
  if (!holidays || holidays.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No holidays found for this staff",
    });
  }
  res.status(200).json({
    success: true,
    holidays,
  });
});



// Update a holiday
export const updateHoliday = asyncCatch(async (req, res) => {
  const holiday = await Holiday.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!holiday) {
    return res.status(404).json({
      success: false,
      message: "No holiday found with that ID",
    });
  }
  res.status(200).json({
    success: true,
    holiday,
  });
});

// Delete a holiday
export const deleteHoliday = asyncCatch(async (req, res) => {
  const holiday = await Holiday.findByIdAndDelete(req.params.id);
  if (!holiday) {
    return res.status(404).json({
      success: false,
      message: "No holiday found with that ID",
    });
  }
  res.status(204).json({
    success: true,
    message: "Holiday deleted successfully",
  });
});
