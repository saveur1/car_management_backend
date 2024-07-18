import Company from "../models/companiesModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";
import Activities from "../models/activityModel.js";
import cloudinary from "cloudinary";

// Create a new company
export const createCompany = asyncCatch(async (req, res) => {
    const companyToAdd = {
        ...req.body,
    };
    
      //If there is file then add its url to staff data
    if (req.file) {
        const cloudinary_image = await cloudinary.v2.uploader.upload(
          req.file.path,
          {
            folder: "companies",
            unique_filename: false,
            use_filename: true,
          }
        );
    
        companyToAdd["company_logo"] = cloudinary_image.secure_url;
    }

  const company = await Company.create(companyToAdd);

  //add new activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Created Company",
    color: "blue"
  });

  res.status(201).json({
    status: "success",
    company,
  });
});

// Get all companies
export const getAllCompanys = asyncCatch(async (req, res) => {
  const company = await Company.find()
                               .sort({_id: -1});
  res.status(200).json({
    status: "success",
    company,
  });
});

// Get a company by ID
export const getCompany = asyncCatch(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return res.status(404).json({
      status: "fail",
      message: "No company found with that ID",
    });
  }
  res.status(200).json({
    status: "success",
    company,
  });
});

// Update a company by ID
export const updateCompany = asyncCatch(async (req, res) => {
    const companyToUpdate = {
        ...req.body,
    };
    
      //If there is file then add its url to staff data
    if(req.file) {
        const cloudinary_image = await cloudinary.v2.uploader.upload(
          req.file.path,
          {
            folder: "companies",
            unique_filename: false,
            use_filename: true,
          }
        );
    
        companyToUpdate["company_logo"] = cloudinary_image.secure_url;
    }

  const company = await Company.findByIdAndUpdate(req.params.id, companyToUpdate, {
    new: true,
    runValidators: true,
  });
  
  if (!company) {
    return res.status(404).json({
      status: "fail",
      message: "No company found with that ID",
    });
  }

  //update activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Updated Company",
    color: "yellow"
  });

  res.status(200).json({
    status: "success",
    company,
  });
});

// Delete a company
export const deleteCompany = asyncCatch(async (req, res) => {
  const company = await Company.findByIdAndDelete(req.params.id);

  if (!company) {
    return res.status(404).json({
      status: "fail",
      message: "No company found with that ID",
    });
  }

  //deleted activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Deleted Company",
    color: "red"
  });

  res.status(200).json({
    status: "success",
    message: "Company was deleted successfully",
  });
});
