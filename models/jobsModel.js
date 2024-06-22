import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({
    job_title:{
        type: String,
        required: [true,"Car Name is required Please"],
        trim: true,
        maxLength:[50,"Car Name can not exceed 50 characters"]
    },
    job_description:{
        type: String,
        required: [true,"Job Description is required Please"],
        trim: true,
        maxLength:[250,"Job Description can not exceed 250 characters"],
    },
    salary_range:{
        type: String,
        required: [true,"Salary Range is required Please"],
        trim: true,
        maxLength:[50,"Salary Range can not exceed 50 characters"],
    },
    skills: String,
    createdAt:{
        type: Date,
        default: Date.now
    },
});


export default mongoose.model("Job",jobsSchema);