import Holiday from "../models/holidayModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";
import Staff from "../models/staffModel.js";


// Create a new holiday
export const createHoliday = asyncCatch(async (req, res) => {
  const saveHoliday = await Holiday.create({...req.body, company: req.staff.company});
  
  const holiday = await Holiday.findById(saveHoliday._id)
                                .populate("staff");
  
  //Update staff to holiday
  await Staff.findByIdAndUpdate(holiday.staff, { status: "holiday" });

  res.status(201).json({
    success: true,
    holiday,
  });
});
// Get all holidays
export const getAllHolidays = asyncCatch(async (req, res) => {
  const holidays = await Holiday.find({ company: req.staff.company }).populate("staff").sort({createdAt: -1});
  res.status(200).json({
    success: true,
    holidays,
  });
});

// Get holiday by staff ID
export const getHolidaysByStaff = asyncCatch(async (req, res) => {
  const { staffId } = req.params;
  const holidays = await Holiday.find({ staff: staffId, company: req.staff.company }).populate("staff").sort({createdAt: -1});
  
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
            })
            .populate("staff");

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
