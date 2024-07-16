import mongoose from "mongoose";
const fuelSchema = new mongoose.Schema({
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
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    default: "669670020f9122e001cd17bc",
    required: true,
  },
  liter:{
    type: Number,
    required: true
  },
  totalCost:{
    type: Number,
    required: true
  },
  costPerLiter: {
    type: Number,
    required: true
  },
},{
    timestamps: true
});
const Fuel = mongoose.model("Fuel",fuelSchema);
export default Fuel;