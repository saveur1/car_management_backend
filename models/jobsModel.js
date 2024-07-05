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
    allowAdd:{
        type: Boolean,
        default: true,
    }
});


export default mongoose.model("Job",jobsSchema);