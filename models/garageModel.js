import mongoose from "mongoose";
const garageSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    index: true,
    required: true,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    index: true,
    required: true,
  },
  garageName: {
    type: String,
    required: [true, "Garage Name is required Please"],
    trim: true,
    maxLength: [50, "Garage Name can not exceed 50 characters"],
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    default: "669670020f9122e001cd17bc",
    required: true
  },
  garageStatus: {
    type: String,
    enum: ["in_garage", "out_of_garage"]
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  }
},{
    timestamps: true
});

const Garage = mongoose.model("Garage", garageSchema);

export default Garage;