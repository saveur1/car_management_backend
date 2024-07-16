import Notification from "../models/notificationModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";
import Activities from "../models/activityModel.js";

// Create a new notification
export const createNotification = asyncCatch(async (req, res) => {
  const notification = await Notification.create({...req.body, company: req.staff.company});

  res.status(201).json({
    status: "success",
    notification,
  });
});

// Get all notifications
export const getAllNotifications = asyncCatch(async (req, res) => {
  const notifications = await Notification.find({ company: req.staff.company })
                                          .populate("booking")
                                          .populate({
                                            path: "booking",
                                            populate: {
                                                path: "customer",
                                                model: "User"
                                            }
                                          })
                                          .populate({
                                            path: "booking",
                                            populate: {
                                                path: "car",
                                                model: "Car"
                                            }
                                          })
                                          .sort({ createdAt: -1 });

                                           

  res.status(200).json({
    status: "success",
    notifications,
  });
});

// Get a notification by ID
export const getNotification = asyncCatch(async (req, res) => {
  const notification = await Notification.findById(req.params.id)
                                        .populate("booking")
                                        .populate({
                                            path: "booking",
                                            populate: {
                                                path: "customer",
                                                model: "User"
                                            }
                                        })
                                        .populate({
                                            path: "booking",
                                            populate: {
                                                path: "car",
                                                model: "Car"
                                            }
                                        })
                                        .sort({ createdAt: -1 });
  if (!notification) {
    return res.status(404).json({
      status: "fail",
      message: "No notification found with that ID",
    });
  }
  res.status(200).json({
    status: "success",
    notification,
  });
});

// Update a notification
export const updateNotification = asyncCatch(async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, {
                                            new: true,
                                            runValidators: true,
                                        })
                                        .populate("booking")
                                        .populate({
                                            path: "booking",
                                            populate: {
                                                path: "customer",
                                                model: "User"
                                            }
                                        })
                                        .populate({
                                            path: "booking",
                                            populate: {
                                                path: "car",
                                                model: "Car"
                                            }
                                        });

  if(!notification) {
    return res.status(404).json({
      status: "fail",
      message: "No notification found with that ID",
    });
  }

  res.status(200).json({
    status: "success",
    notification,
  });
});

// Delete a notification
export const deleteNotification = asyncCatch(async (req, res) => {
  const notification = await Notification.findByIdAndDelete(req.params.id);
  if (!notification) {
    return res.status(404).json({
      status: "fail",
      message: "No notification found with that ID",
    });
  }

  res.status(204).json({
    status: "success",
    message: "Notification was deleted successfully",
  });
});
