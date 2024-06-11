import Fuel from "../models/fuelModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";

// Create a new fuel entry
export const createFuel = asyncCatch(async (req, res) => {
  const fuel = new Fuel(req.body);
  await fuel.save();
  res.status(201).json({
    status: "success",
    fuel,
  });
});

// Get all fuel entries
export const getAllFuels = asyncCatch(async (req, res) => {
  const fuels = await Fuel.find().populate("employee").populate("car");
  res.status(200).json({
    status: "success",
    fuels,
  });
});

// Get a fuel entry by ID
export const getFuel = asyncCatch(async (req, res) => {
  const fuel = await Fuel.findById(req.params.id)
    .populate("employee")
    .populate("car");
  if (!fuel) {
    return res.status(404).json({
      status: "fail",
      message: "No fuel entry found with that ID",
    });
  }
  res.status(200).json({
    status: "success",
    fuel,
  });
});

// Update a fuel entry
export const updateFuel = asyncCatch(async (req, res) => {
  const fuel = await Fuel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!fuel) {
    return res.status(404).json({
      status: "fail",
      message: "No fuel entry found with that ID",
    });
  }
  res.status(200).json({
    status: "success",
    fuel,
  });
});

// Delete a fuel entry
export const deleteFuel = asyncCatch(async (req, res) => {
  const fuel = await Fuel.findByIdAndDelete(req.params.id);
  if (!fuel) {
    return res.status(404).json({
      status: "fail",
      message: "No fuel entry found with that ID",
    });
  }
  res.status(204).json({
    status: "success",
    message: "Fuel entry was deleted successfully",
  });
});

// Get fuel entries by employee ID
export const getFuelsByEmployee = asyncCatch(async (req, res) => {
  const employee = req.params.employee;
  const fuels = await Fuel.find({ employee })
    .populate("employee")
    .populate("car");
  res.status(200).json({
    status: "success",
    fuels,
  });
});
