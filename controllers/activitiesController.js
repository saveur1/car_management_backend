import Activities from "../models/activityModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";

// Create a new asset
export const createActivity = asyncCatch(async (req, res) => {
    const activity = await Activities.create({...req.body, company: req.staff.company._id});
  
    res.status(201).json({
      status: "success",
      activity,
    });
});

// Get all activities
export const getAllActivities = asyncCatch(async (req, res) => {
  const activities = await Activities.find()
                                     .populate("staff")
                                     .where("company", req.staff.company._id);
  res.status(200).json({
    success: true,
    activities,
  });
});

// Get activities by staff ID
export const getActivitiesByStaff = asyncCatch(async (req, res) => {
  const { staffId } = req.params;
  const activities = await Activities.find({ staff: staffId })
                                     .populate("staff")
                                     .where("company", req.staff.company._id);
  
  res.status(200).json({
    success: true,
    activities,
  });
});
