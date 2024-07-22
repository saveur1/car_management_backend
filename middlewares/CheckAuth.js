import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler.js";
import asyncCatch from "./asyncCatch.js";
import Staff from "../models/staffModel.js";

//check if user is authanticated
export const CheckAuth = asyncCatch(async(req,res,next)=>{

    const { authorization } = req.headers;

    if(!authorization){
        return next(new ErrorHandler("Login First To Access this resource",401));
    }

    const token = authorization?.split(" ")[1];

    const decoded = jwt.verify(token , process.env.JWT_SECRET);

    req.staff = await Staff.findById(decoded.id)
                           .populate("position")
                           .populate("company");

    next();
});

//Authorize user base on role
export const CheckRole = (...roles)=>{
    const newRoles = roles?.map(role => role?.toLowerCase());

    return (req,res,next)=>{
        
        if(!newRoles.includes(req.staff.position.job_title.toLowerCase())){
            return next(
                new ErrorHandler(`Your role is not allowed to access this resource`,403)
            );
        }
        next();
    }
}