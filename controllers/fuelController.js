import Fuel from "../models/fuelModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";
import Activities from "../models/activityModel.js";

// Create a new fuel entry
export const createFuel = asyncCatch(async (req, res) => {
  const newFuel = await Fuel.create(req.body);

  const fuel = await Fuel.findById(newFuel._id)
                          .populate("employee")
                             .populate("car");

  //add new activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Created Fuel",
    company: req.staff.company,
    color: "blue"
  });

  res.status(201).json({
    status: "success",
    fuel,
  });
});

// Get all fuel entries
export const getAllFuels = asyncCatch(async (req, res) => {
  const fuels = await Fuel.find({ company: req.staff.company })
                          .populate("employee")
                          .populate("car")
                          .sort({_id: -1});
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
                                })
                                .populate("employee")
                                .populate("car");

  if (!fuel) {
    return res.status(404).json({
      status: "fail",
      message: "No fuel entry found with that ID",
    });
  }

  //updated activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Updated Fuel",
    company: req.staff.company,
    color: "yellow"
  });

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

  //deleted activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Deleted Fuel",
    company: req.staff.company,
    color: "red"
  });

  res.status(200).json({
    status: "success",
    message: "Fuel entry was deleted successfully",
  });
});

// Get fuel entries by employee ID
export const getFuelsByEmployee = asyncCatch(async (req, res) => {
  const employee = req.params.employee;
  const fuels = await Fuel.find({ employee, company: req.staff.company })
                          .populate("employee")
                          .populate("car")
                          .sort({_id: -1});
  res.status(200).json({
    status: "success",
    fuels,
  });
});

// Get fuel entries by car ID
export const getFuelsByCar = asyncCatch(async (req, res) => {
    const car = req.params.carId;
    const fuels = await Fuel.find({ car, company: req.staff.company })
                            .populate("employee")
                            .populate("car")
                            .sort({_id: -1});
    res.status(200).json({
      status: "success",
      fuels,
    });
  });
  
