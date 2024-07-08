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
    expires:{
        type: Date,
        required: true
    },
},
{
    timestamps: true
});


export default mongoose.model("Session",sessionSchema);