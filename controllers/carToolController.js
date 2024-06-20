import CarTool from "../models/carToolModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";

// Create a new car tool entry
export const createCarTool = asyncCatch(async (req, res) => {

  const backend_url = process.env.BACKEND_URL || "https://tech-car-rent.onrender.com";
  //append image to Car Tool object
  const carTool = new CarTool({
        ...req.body,
        photo: backend_url+"/"+req.file.path
  });

  await carTool.save();

  res.status(201).json({
    status: "success",
    carTool,
  });
});

// Get all car tool entries
export const getAllCarTools = asyncCatch(async (req, res) => {
  const carTools = await CarTool.find();
  res.status(200).json({
    status: "success",
    carTools,
  });
});

// Get a car tool entry by ID
export const getCarTool = asyncCatch(async (req, res) => {
  const carTool = await CarTool.findById(req.params.id);
  if (!carTool) {
    return res.status(404).json({
      status: "fail",
      message: "No car tool entry found with that ID",
    });
  }
  res.status(200).json({
    status: "success",
    carTool,
  });
});

// Update a car tool entry
export const updateCarTool = asyncCatch(async (req, res) => {
    
  const carTool = await CarTool.findByIdAndUpdate(req.params.id,{
    ...req.body,
    photo: req.headers.origin+"/"+req.file.path
    }, 
    {
    new: true,
    runValidators: true,
  });

  if (!carTool) {
    return res.status(404).json({
      status: "fail",
      message: "No car tool entry found with that ID",
    });
  }
  res.status(200).json({
    status: "success",
    carTool,
  });
});

// Delete a car tool entry
export const deleteCarTool = asyncCatch(async (req, res) => {
  const carTool = await CarTool.findByIdAndDelete(req.params.id);
  if (!carTool) {
    return res.status(404).json({
      status: "fail",
      message: "No car tool entry found with that ID",
    });
  }
  res.status(200).json({
    status: "success",
    message: "Car tool entry was deleted successfully",
  });
});
