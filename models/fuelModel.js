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
  little:{
    type: String,
    required: true
  },
  totalCost:{
    type: String,
    required: true
  },
  costPerLitre: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
});
const Fuel = mongoose.model("Fuel",fuelSchema);
export default Fuel;