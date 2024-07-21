import Asset from "../models/assetModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";
import Activities from "../models/activityModel.js";

// Create a new asset
export const createAsset = asyncCatch(async (req, res) => {
  const asset = await Asset.create({ ...req.body, company: req.staff.company });

  //add new activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Created Asset",
    company: req.staff.company,
    color: "blue"
  });

  res.status(201).json({
    status: "success",
    asset,
  });
});

// Get all assets
export const getAllAssets = asyncCatch(async (req, res) => {
  const assets = await Asset.find({company: req.staff.company})
                            .sort({_id: -1});
  res.status(200).json({
    status: "success",
    assets,
  });
});

// Get an asset by ID
export const getAsset = asyncCatch(async (req, res) => {
  const asset = await Asset.findById(req.params.id);

  if (!asset) {
    return res.status(404).json({
      status: "fail",
      message: "No asset found with that ID",
    });
  }
  res.status(200).json({
    status: "success",
    asset,
  });
});

// Update an asset
export const updateAsset = asyncCatch(async (req, res) => {
  const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!asset) {
    return res.status(404).json({
      status: "fail",
      message: "No asset found with that ID",
    });
  }

  //update activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Updated Asset",
    company: req.staff.company,
    color: "yellow"
  });

  res.status(200).json({
    status: "success",
    asset,
  });
});

// Delete an asset
export const deleteAsset = asyncCatch(async (req, res) => {
  const asset = await Asset.findByIdAndDelete(req.params.id);

  if (!asset) {
    return res.status(404).json({
      status: "fail",
      message: "No asset found with that ID",
    });
  }

  //deleted activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Deleted Asset",
    company: req.staff.company,
    color: "red"
  });

  res.status(200).json({
    status: "success",
    message: "Asset was deleted successfully",
  });
});
