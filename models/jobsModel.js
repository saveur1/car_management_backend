import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({
    job_title:{
        type: String,
        required: [true,"Car Name is required Please"],
        trim: true,
        maxLength:[50,"Car Name can not exceed 50 characters"]
    },
    skills: String,
    createdAt:{
        type: Date,
        default: Date.now
    },
});


export default mongoose.model("Job",jobsSchema);