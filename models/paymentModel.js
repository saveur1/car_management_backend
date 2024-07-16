import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: false,
  },
  paymentMethod: {
    type: String,
    required: false,
  },
  accountNumber: {
    type: Number,
    required: false,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    default: "669670020f9122e001cd17bc",
    required: true,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
});
const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;