import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler.js";
import asyncCatch from "./asyncCatch.js";
import User from "../models/userModel.js";

//check if user is authanticated
export const CheckAuth = asyncCatch(async(req,res,next)=>{

    const { authorization } = req.headers;

    if(!authorization){
        return next(new ErrorHandler("Login First To Access this resource",401));
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token , process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
});

//Authorize user base on role
export const CheckRole = (...roles)=>{
    return (req,res,next)=>{
        
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`,403)
            );
        }
        next();
    }
}