import mongoose from "mongoose";

const carToolSchema = new mongoose.Schema({
  nameOfTool: {
    type: String,
    required: [true, "Name of Tool is required"],
    trim: true,
    maxLength: [50, "Name of Tool cannot exceed 50 characters"],
  },
  toolsBrand: {
    type: String,
    required: [true, "Tool Brand is required"],
    trim: true,
    maxLength: [50, "Tool Brand cannot exceed 50 characters"],
  },
  modelNumber: {
    type: String,
    required: [true, "Model Number is required"],
    trim: true,
    maxLength: [50, "Model Number cannot exceed 50 characters"],
  },
  serialNumber: {
    type: String,
    required: [true, "Serial Number is required"],
    trim: true,
    maxLength: [50, "Serial Number cannot exceed 50 characters"],
    unique: true,
  },
  toolsCategory: {
    type: String,
    required: [true, "Tools Category is required"],
    trim: true,
    maxLength: [50, "Tools Category cannot exceed 50 characters"],
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  pricePerUnity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const CarTool = mongoose.model("CarTool", carToolSchema);
export default CarTool;
