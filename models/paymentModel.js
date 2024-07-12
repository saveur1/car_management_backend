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
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
});
const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;