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
    default: "66965043ad17b5897e2f6ec9"
  },
  paymentDate: {
    type: Date,
    required: true,
  },
});
const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;