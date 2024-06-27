import Asset from "../models/assetModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";

// Create a new asset
export const createAsset = asyncCatch(async (req, res) => {
  const asset = new Asset(req.body);
  await asset.save();
  res.status(201).json({
    status: "success",
    asset,
  });
});

// Get all assets
export const getAllAssets = asyncCatch(async (req, res) => {
  const assets = await Asset.find()
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
  res.status(200).json({
    status: "success",
    message: "Asset was deleted successfully",
  });
});
