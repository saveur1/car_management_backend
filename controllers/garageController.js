import Garage from "../models/garageModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";

// Create a new garage entry
export const createGarage = asyncCatch(async (req, res) => {
  const garage = new Garage(req.body);
  await garage.save();
  res.status(201).json({
    status: "success",
    garage,
  });
});

// Get all garage entries
export const getAllGarages = asyncCatch(async (req, res) => {
  const garages = await Garage.find().populate("employee").populate("car");
  res.status(200).json({
    status: "success",
    garages,
  });
});

// Get a garage entry by ID
export const getGarage = asyncCatch(async (req, res) => {
  const garage = await Garage.findById(req.params.id)
    .populate("employee")
    .populate("car");
  if (!garage) {
    return res.status(404).json({
      status: "fail",
      message: "No garage entry found with that ID",
    });
  }
  res.status(200).json({
    status: "success",
    garage,
  });
});

// Update a garage entry
export const updateGarage = asyncCatch(async (req, res) => {
  const garage = await Garage.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!garage) {
    return res.status(404).json({
      status: "fail",
      message: "No garage entry found with that ID",
    });
  }
  res.status(200).json({
    status: "success",
    garage,
  });
});

// Delete a garage entry
export const deleteGarage = asyncCatch(async (req, res) => {
  const garage = await Garage.findByIdAndDelete(req.params.id);
  if (!garage) {
    return res.status(404).json({
      status: "fail",
      message: "No garage entry found with that ID",
    });
  }
  res.status(200).json({
    status: "success",
    message: "Garage entry was deleted successfully",
  });
});

// Get garage entries by employee ID
export const getGaragesByEmployee = asyncCatch(async (req, res) => {
  const employee = req.params.employee;
  const garages = await Garage.find({ employee })
    .populate("employee")
    .populate("car");
  res.status(200).json({
    status: "success",
    garages,
  });
});
