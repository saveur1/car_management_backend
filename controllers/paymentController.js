import Payment from "../models/paymentModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";
import mongoose from "mongoose";

// Create a new payment
export const createPayment = asyncCatch(async (req, res) => {

    const { staffs, reason, paymentDate } = req.body;
    const insertedIds = [];

    //save all incoming payments
    for(let staffId of staffs){

        const payment = await Payment.create({
            staff: staffId,
            paymentDate: paymentDate,
            reason: reason
        })

        insertedIds.push(payment?._id);
    }

    const payments = await Payment.find({_id: {$in: insertedIds }})
                              .populate("staff");


    res.status(201).json({
        success: true,
        payments,
    })                     
});

//get all payment

export const getPayments = asyncCatch(async (req, res) => {
const payments = await Payment.find()
                         .populate("staff");

        res.status(200).json({
            success: true,
            payments,
 })
});
//get single payment by staff

export const getPaymentByStaff = asyncCatch(async (req, res) => {
const { staffId } = req.params;
const payments = await Payment.find({ staff: staffId })
                         .populate("staff");

        res.status(200).json({
            success: true,
            payments,
 })
});
//get single payment by id
export const getPaymentById = asyncCatch(async(req,res) => {
    const payment = await Payment.findById(req.params.id)
                         .populate("staff");

                         res.status(200).json({
                            success: true,
                            payment,
                         })
});

//update payment

export const updatePayment = asyncCatch(async (req, res) => {
const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
})
.populate("staff");

if (!payment) {
    return res.status(404).json({
        success: false,
        message: "Payment not found",
    });
}

res.status(200).json({
    success: true,
    payment,
});
});

//delete payment

export const deletePayment = asyncCatch(async (req, res) => {
const payment = await Payment.findByIdAndDelete(req.params.id);

if (!payment) {
    return res.status(404).json({
        success: false,
        message: "Payment not found",
    });
}

res.status(200).json({
    success: true,
    message: "Payment deleted",
});
});