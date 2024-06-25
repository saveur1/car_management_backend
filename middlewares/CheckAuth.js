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

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token , process.env.JWT_SECRET);

    req.staff = await Staff.findById(decoded.id)
                           .populate("position");

    next();
});

//Authorize user base on role
export const CheckRole = (...roles)=>{
    return (req,res,next)=>{
        
        if(!roles.includes(req.staff.position.job_title)){
            return next(
                new ErrorHandler(`Role ${req.staff.position.job_title} is not allowed to access this resource`,403)
            );
        }
        next();
    }
}