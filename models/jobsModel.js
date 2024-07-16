import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({
    job_title:{
        type: String,
        required: [true,"Car Name is required Please"],
        trim: true,
        maxLength:[50,"Car Name can not exceed 50 characters"],
        unique: true
    },
    skills: String,
    createdAt:{
        type: Date,
        default: Date.now
    },
    allowDelete:{
        type: Boolean,
        default: true,
    },
    allowEdit:{
        type: Boolean,
        default: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        default: "669670020f9122e001cd17bc",
        required: true
    },
    allowAdd:{
        type: Boolean,
        default: true,
    }
});


export default mongoose.model("Job",jobsSchema);