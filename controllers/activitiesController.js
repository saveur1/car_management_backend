import Activities from "../models/activityModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";

// Create a new asset
export const createActivity = asyncCatch(async (req, res) => {
    const newActivity = await Activities.create({
            ...req.body,
            activityName: "Added Activity",
            color: "blue",
            company: req.staff.company
    });

    const activity = await Activities.findById(newActivity._id)
                                     .populate("staff")
                                        .populate({
                                            path: "staff",
                                            populate: {
                                                path: "position",
                                                model: "Job"
                                            }
                                        });
  
    res.status(201).json({
      status: "success",
      activity,
    });
});

// Get all activities
export const getAllActivities = asyncCatch(async (req, res) => {
  const activities = await Activities.find({company: req.staff.company})
                                     .populate("staff")
                                     .populate({
                                        path: "staff",
                                        populate: {
                                            path: "position",
                                            model: "Job"
                                        }
                                     });


  res.status(200).json({
    success: true,
    activities,
  });
});

// Get activities by staff ID
export const getActivitiesByStaff = asyncCatch(async (req, res) => {
  const { staffId } = req.params;
  const activities = await Activities.find({ staff: staffId, company: req.staff.company })
                                     .populate("staff")
                                     .populate({
                                        path: "staff",
                                        populate: {
                                            path: "position",
                                            model: "Job"
                                        }
                                     });
  
  res.status(200).json({
    success: true,
    activities,
  });
});
