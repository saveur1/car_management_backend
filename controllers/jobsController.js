import asyncCatch from "../middlewares/asyncCatch.js";
import Job from "../models/jobsModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Activities from "../models/activityModel.js";

//Register Job =>POST /api/v1/jobs
export const registerJob = asyncCatch(async(req,res,next)=>{
  const job = await Job.create(req.body);

  //add new activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Created Job Position",
    company: req.staff.company,
    color: "blue"
  });

  res.status(200).json({
    success: true,
    job,
  });
});

//Get all jobs => Get /api/v1/jobs -> admin only route
export const getAllJobs = asyncCatch(async(req,res,next)=>{

    const jobs = await Job.find({ company: req.staff.company })
                          .sort({ _id: -1});

    res.status(200).json({
        success:true,
        jobs
    });
})

//get job Details => Get /api/v1/jobs/:id -> admin only route
export const getJobDetails = asyncCatch(async(req,res,next)=>{

    const job = await Job.findById(req.params.id);

    if(!job){
        return next(new ErrorHandler(`job with id ${req.params.id} is not found in database`,400))
    }

    res.status(200).json({
        success:true,
        job
    });
});

//Update job details =>PUT /api/jobs/:id -> admin only route
export const updateJobInfo = asyncCatch(async(req,res,next)=>{
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  //update activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Updated Job Position",
    company: req.staff.company,
    color: "yellow"
  });

  res.status(200).json({
    success: true,
    job,
  });
});

//Delete Job => DELETE /api/v1/jobs/:id
export const deleteJob = asyncCatch(async(req,res,next)=>{
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(
      new ErrorHandler(`job with Id ${req.params.id} is not Registered`, 400)
    );
  }

  await Job.findByIdAndDelete(req.params.id);
  
  //deleted activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Deleted Job Position",
    company: req.staff.company,
    color: "red"
  });

  res.status(200).json({
    success: true,
    message: "Job is Deleted Successfully.",
  });
})