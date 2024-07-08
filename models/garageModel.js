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
  garageStatus: {
    type: String,
    enum: ["garage", "completed"]
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