import asyncCatch from "../middlewares/asyncCatch.js";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendToken from "../utils/sendToken.js";
import Activities from "../models/activityModel.js";
import cloudinary from "cloudinary";


//Register User => /api/v1/register
export const registerUser = asyncCatch(async(req,res,next)=>{
    const userToAdd = {
        ...req.body,
        company: req.staff.company,
      };
    
      //If there is file then add its url to staff data
      if (req.file) {
        const cloudinary_image = await cloudinary.v2.uploader.upload(
          req.file.path,
          {
            folder: "user",
            unique_filename: false,
            use_filename: true,
          }
        );
    
        userToAdd["avatar"] = cloudinary_image.secure_url;
      }

  const user = await User.create(userToAdd);

  //add new activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Registered User",
    company: req.staff.company,
    color: "blue"
  });

  sendToken(201, user, res);
});



//Get all Users => /api/v1/users -> admin only route
export const getAllUsers = asyncCatch(async(req,res,next)=>{

    const users = await User.find({ company: req.staff.company })
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
    const userToUpdate = {
        ...req.body,
      };
    
      //If there is file then add its url to staff data
      if (req.file) {
        const cloudinary_image = await cloudinary.v2.uploader.upload(
          req.file.path,
          {
            folder: "user",
            unique_filename: false,
            use_filename: true,
          }
        );
    
        userToUpdate["avatar"] = cloudinary_image.secure_url;
      }

  const user = await User.findByIdAndUpdate(req.params.id, userToUpdate, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  //update activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Updated User",
    company: req.staff.company,
    color: "yellow"
  });

  res.status(200).json({
    success: true,
    user,
  });
});

//Delete user => /api/v1/user/:id
export const deleteUser = asyncCatch(async(req,res,next)=>{
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User with Id ${req.params.id} is not Registered`, 400)
    );
  }

  await User.findByIdAndDelete(req.params.id);

  //delete activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Deleted User",
    company: req.staff.company,
    color: "red"
  });
  
  res.status(200).json({
    success: true,
    message: "User is Deleted.",
  });
})

//get users by category =>GET /api/v1/users/category/:category
export const getUserByCategory = asyncCatch(async(req,res,next)=>{

    const users = await User.find({
        categories:req.params.category,
        company: req.staff.company
    }).sort({ _id: -1});

    res.status(200).json({
        success:true,
        users
    });
});

//get users by role =>GET /api/v1/users/role/:role
export const getUserByRole = asyncCatch(async(req,res,next)=>{

    const users = await User.find({
        role:req.params.role,
        company: req.staff.company,
    }).sort({ _id: -1});

    res.status(200).json({
        success:true,
        users
    });
});