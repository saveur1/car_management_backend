import asyncCatch from "../middlewares/asyncCatch.js";
import Salary from "../models/salariesModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Activities from "../models/activityModel.js";

//Register Salary =>POST /api/v1/salaries
export const registerSalary = asyncCatch(async(req,res,next)=>{
  const salary = await Salary.create({...req.body, company: req.staff.company});

  //add new activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Added Salary Group",
    company: req.staff.company,
    color: "blue"
  });

  res.status(200).json({
    success: true,
    salary,
  });
});

//Get all salaries => Get /api/v1/salaries -> admin only route
export const getAllSalaries = asyncCatch(async(req,res,next)=>{

    const salaries = await Salary.find({ company: req.staff.company })
                                 .populate("job")
                                 .populate("employee")
                                 .sort({ _id: -1});

    res.status(200).json({
        success:true,
        salaries
    });
})

//get salary Details => Get /api/v1/salaries/:id -> admin only route
export const getSalaryDetails = asyncCatch(async(req,res,next)=>{

    const salary = await Salary.findById(req.params.id)
                               .populate("job")
                               .populate("salary");

    if(!salary){
        return next(new ErrorHandler(`Salary with id ${req.params.id} is not found in database`,400))
    }

    res.status(200).json({
        success:true,
        salary
    });
});

//Update Salary details =>PUT /api/salaries/:id -> admin only route
export const updateSalaryInfo = asyncCatch(async(req,res,next)=>{
  const salary = await Salary.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    salary,
  });
});

//Delete Salary => DELETE /api/v1/salaries/:id
export const deleteSalary = asyncCatch(async(req,res,next)=>{
  const salary = await Salary.findById(req.params.id);

  if (!salary) {
    return next(
      new ErrorHandler(`Salary with Id ${req.params.id} is not Registered`, 400)
    );
  }

  await Salary.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Salary is Deleted Successfully.",
  });
})