import asyncCatch from "../middlewares/asyncCatch.js";
import cloudinary from "cloudinary";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendToken from "../utils/sendToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";


//Register User => /api/v1/register
export const registerUser = asyncCatch(async(req,res,next)=>{

    const user = await User.create({...req.body});

    sendToken(201,user,res);

});

//User forgot password => /api/v1/password/forgot
export const userForgotPassword = asyncCatch(async(req,res,next)=>{

    const { email } = req.body;

    //getting user information
    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Provided User Email Doesn't match Any in Database",404));
    }

    //get user token
    const resetCode = user.generateResetPasswordToken().toUpperCase();

    await user.save({ validateBeforeSave:false });

    //generate reset link
    // const link = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    
    const message = 
    `<h2 style='color:blue;'>Need to reset your password?</h2>
     <p>Use your secret code!</p>
     <p style='font-style:italic;font-weight:bold;padding:20px;margin-left:30px'>${ resetCode }</p>
     <p>If you did not forget your password, you can ignore this email.</p>`;
    
    try {

        await sendEmail({
            email:email,
            subject:"CarRental Password Recovery",
            message
        });

        res.status(200).json({
            success:true,
            message:`Email Sent To: ${email}`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save({validateBeforeSave:false});
        
        return next(new ErrorHandler(error.message,500));
    }
});


//User reset password => /api/v1/password/reset
export const userResetPassword = asyncCatch(async(req,res,next)=>{

    const resetToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken: resetToken,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if(!user){
        return next(new ErrorHandler("Password reset token is invalid or has expired",400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    user.password = req.body.password;

    await user.save();

    sendToken(200,user,res);
});

// Get user profile of logged user => /api/v1/profile
export const getUserProfile = asyncCatch(async(req,res,next)=>{

    const user = await User.findById(req.user.id);
    
    res.status(200).json({
        success: true,
        user
    });
})

//UPdate User password => /api/v1/password/update

export const updateUserPassword = asyncCatch(async(req,res,next)=>{

    const user = await User.findById(req.user._id).select("+password");

    //compare if old password match to what is in database;
    const isMatch = await user.comparePassword(req.body.oldPassword);

    if(!isMatch){
        return next(new ErrorHandler("Existing Password is Incorrect",400));
    }

    user.password = req.body.password;

    await user.save();

    sendToken(200, user, res);
})


//Upadate Profile of currently logged in user => /api/v1/profile/update
export const updateUserProfile = asyncCatch(async(req,res,next)=>{
    const newData = {
        name:req.body.name,
        email:req.body.email
    };

    // Update Profile Avatar
    if(req.body.avatar){
        const user = await User.findById(req.user.id);

        const image_id = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"shopit",
            width:150,
            crop:"scale"
        });

        newData.avatar = {
            public_id:result.public_id,
            url:result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user._id,newData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true
    });
})


//Logout User => /api/v1/logout
export const logoutUser = asyncCatch(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message:"User Logged out."
    });
})


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