import CarTool from "../models/carToolModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";
import cloudinary from "cloudinary";
import Activities from "../models/activityModel.js";

// Create a new car tool entry
export const createCarTool = asyncCatch(async (req, res) => {
  //upload image to cloudinary
  const image_url = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: "Car Tools",
    use_filename: true,
    unique_filename: false,
  });

  //append image to Car Tool object
  const carTool = new CarTool({
    ...req.body,
    photo: image_url.secure_url,
    company: req.staff.company,
  });

  await carTool.save();

  //add new activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Created Car Tool",
    company: req.staff.company,
    color: "blue"
  });

  res.status(201).json({
    status: "success",
    carTool,
  });
});

// Get all car tool entries
export const getAllCarTools = asyncCatch(async (req, res) => {
  const carTools = await CarTool.find({ company: req.staff.company })
                                .sort({_id: -1});
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
  const data = { ...req.body };

  if (req.file) {
    //upload image to cloudinary
    const image_url = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "Car Tools",
      use_filename: true,
      unique_filename: false,
    });

    data["photo"] = image_url.secure_url;
  }

  const carTool = await CarTool.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });

  if (!carTool) {
    return res.status(404).json({
      status: "fail",
      message: "No car tool entry found with that ID",
    });
  }

  //update activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Updated Car Tool",
    company: req.staff.company,
    color: "yellow"
  });

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

  //Deleted activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Deleted Car Tool",
    company: req.staff.company,
    color: "red"
  });

  res.status(200).json({
    status: "success",
    message: "Car tool entry was deleted successfully",
  });
});
