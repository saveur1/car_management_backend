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
        default: "66965043ad17b5897e2f6ec9"
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