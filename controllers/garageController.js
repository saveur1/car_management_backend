import Garage from "../models/garageModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";
import Car from "../models/carsModel.js";
import Activities from "../models/activityModel.js";

// Create a new garage entry
export const createGarage = asyncCatch(async (req, res) => {
  const newGarage = await Garage.create({...req.body, company: req.staff.company });

  const garage = await Garage.findById(newGarage._id)
                             .populate("employee")
                             .populate("car");

  //Update car to be under maintenance
  switch(req.body.garageStatus){
    case "out_of_garage":
        await Car.findByIdAndUpdate(req.body.car, { current_status: "available" });
        break;
    case "in_garage":
        await Car.findByIdAndUpdate(req.body.car, { current_status: "under_maintenance" });
        break;
    default:
        break;
  }

  //add new activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Created Garage",
    company: req.staff.company,
    color: "blue"
  });

  //return response
  res.status(201).json({
    status: "success",
    garage,
  });
});

// Get all garage entries
export const getAllGarages = asyncCatch(async (req, res) => {
  const garages = await Garage.find({ company: req.staff.company })
                              .populate("employee")
                              .populate("car")
                              .sort({_id: -1});
  res.status(200).json({
    status: "success",
    garages,
  });
});

// Get a garage entry by ID
export const getGarage = asyncCatch(async (req, res) => {
  const garage = await Garage.findById(req.params.id)
                             .populate("employee")
                             .populate("car")
                             .sort({_id: -1});
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
                            })
                            .populate("employee")
                            .populate("car");

  switch(req.body.garageStatus){
    case "out_of_garage":
        await Car.findByIdAndUpdate(req.body.car, { current_status: "available" });
        break;
    case "in_garage":
        await Car.findByIdAndUpdate(req.body.car, { current_status: "under_maintenance" });
        break;
    default:
        break;
  }

  if (!garage) {
    return res.status(404).json({
      status: "fail",
      message: "No garage entry found with that ID",
    });
  }

  //updated activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Updated Garage",
    company: req.staff.company,
    color: "yellow"
  });

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

  await Car.findByIdAndUpdate(garage.car, {
    current_status: "available",
  });

  //Deleted activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Deleted Garage",
    company: req.staff.company,
    color: "red"
  });
  
  res.status(200).json({
    status: "success",
    message: "Garage entry was deleted successfully",
  });
});

// Get garage entries by car ID
export const getGaragesByEmployee = asyncCatch(async (req, res) => {
  const car = req.params.car;
  const garages = await Garage.find({ car, company: req.staff.company })
                              .populate("employee")
                              .populate("car")
                              .sort({ _id: -1});
  res.status(200).json({
    status: "success",
    garages,
  });
});
