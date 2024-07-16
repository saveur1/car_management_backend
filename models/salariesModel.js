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
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        default: "66965043ad17b5897e2f6ec9"
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