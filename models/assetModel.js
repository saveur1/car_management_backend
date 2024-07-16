import mongoose from "mongoose";
const assetSchema = new mongoose.Schema({
nameOfAsset: {
    type: String,
    required: [true, "Name of Asset is required Please"],
    trim: true,
    maxLength: [50, "Name of Asset can not exceed 50 characters"],
},
unities: {
    type: Number,
    required: [true, "Unities is required Please"],
    maxLength: [12, "Unities can not exceed 50 characters"],
},
unityPrice: {
    type: Number,
    required: true,
},
company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    default: "669670020f9122e001cd17bc",
    required: true
},
UnityTotalPrice: {
    type: Number,
    required:true,
},
description: {
    type: String,
    required: [true, "Description is required Please"],
}
},{
    timestamps: true
});
const Asset = mongoose.model("Asset", assetSchema);
export default Asset;