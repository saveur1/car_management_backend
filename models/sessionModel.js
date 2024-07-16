import mongoose from "mongoose";


const sessionSchema = new mongoose.Schema({
    sessionToken:{
        type: String,
        required: true,
        unique: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        default: "669670020f9122e001cd17bc",
        required: true
    },
    expires:{
        type: Date,
        required: true
    },
},
{
    timestamps: true
});


export default mongoose.model("Session",sessionSchema);