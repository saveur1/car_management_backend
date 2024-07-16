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
    default: "66965043ad17b5897e2f6ec9"
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