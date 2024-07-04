import Activities from "../models/activityModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";

// Get all activities
export const getAllActivities = asyncCatch(async (req, res) => {
  const activities = await Activities.find().populate("staff");
  res.status(200).json({
    success: true,
    activities,
  });
});

// Get activities by staff ID
export const getActivitiesByStaff = asyncCatch(async (req, res) => {
  const { staffId } = req.params;
  const activities = await Activities.find({ staff: staffId }).populate(
    "staff"
  );
  
  res.status(200).json({
    success: true,
    activities,
  });
});
