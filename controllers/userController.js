import asyncCatch from "../middlewares/asyncCatch.js";
import cloudinary from "cloudinary";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendToken from "../utils/sendToken.js";
import schedule from "node-schedule";


//Register User => /api/v1/register
export const registerUser = asyncCatch(async(req,res,next)=>{

    const user = await User.create({...req.body});

    sendToken(201,user,res);

});



//Get all Users => /api/v1/users -> admin only route
export const getAllUsers = asyncCatch(async(req,res,next)=>{

    const users = await User.find()
                            .sort({ _id: -1});

    res.status(200).json({
        success:true,
        users
    });
})

//get User Details => /api/v1/user/:id -> admin only route
export const getUserDetails = asyncCatch(async(req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User with id ${req.params.id} is not found in database`,400))
    }

    res.status(200).json({
        success:true,
        user
    });
});

//Update user details => /api/user/:id -> admin only route
export const updateUserInfo = asyncCatch(async(req,res,next)=>{

    const user = await User.findByIdAndUpdate(req.params.id, req.body ,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        user
    }); 
});

//Delete user => /api/v1/user/:id
export const deleteUser = asyncCatch(async(req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User with Id ${req.params.id} is not Registered`,400));
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true,
        message:"User is Deleted."
    });
})

//get users by category =>GET /api/v1/users/category/:category
export const getUserByCategory = asyncCatch(async(req,res,next)=>{

    const users = await User.find({
        categories:req.params.category
    }).sort({ _id: -1});

    res.status(200).json({
        success:true,
        users
    });
});

//get users by role =>GET /api/v1/users/role/:role
export const getUserByRole = asyncCatch(async(req,res,next)=>{

    const users = await User.find({
        role:req.params.role
    }).sort({ _id: -1});

    res.status(200).json({
        success:true,
        users
    });
});