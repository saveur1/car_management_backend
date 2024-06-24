import mongoose from "mongoose";


const salariesSchema = new mongoose.Schema({
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    amount:{
        type: Number,
        required: [true,"Job Amount is required Please"],
        maxLength:[10,"Job amount can not exceed 10 characters"],
    },
    employee:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        required: true,
        unique: [true, "Employee can not have many salaries"],
        message: "Employee can not have many salaries"
    }],
},
{
    timestamps: true
});


export default mongoose.model("Salary",salariesSchema);