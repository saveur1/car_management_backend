import mongoose from "mongoose";


const accountSchema = new mongoose.Schema({
    type:{
        type: String,
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
    provider:{
        type: String,
    },
    providerAccountId: String,
    refresh_token:     String,
    access_token:      String,
    expires_at:        Number,
    token_type:        String,
    scope:             String,
    id_token:          String,
    session_state:     String
},
{
    timestamps: true
});


export default mongoose.model("Account", accountSchema);