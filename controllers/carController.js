import asyncCatch from "../middlewares/asyncCatch.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Car from "../models/carsModel.js";

//Register Car =>POST /api/v1/cars/create
export const registerCar = asyncCatch(async(req,res,next)=>{

    const car = await Car.create(req.body); 

    res.status(200).json({
        success:true,
        car
    });

});

//Get all cars => Get /api/v1/cars -> admin only route
export const getAllCars = asyncCatch(async(req,res,next)=>{

    const cars = await Car.find();

    res.status(200).json({
        success:true,
        cars
    });
})

//get Car Details => Get /api/v1/cars/:id -> admin only route
export const getCarDetails = asyncCatch(async(req,res,next)=>{

    const car = await Car.findById(req.params.id);

    if(!car){
        return next(new ErrorHandler(`Car with id ${req.params.id} is not found in database`,400))
    }

    res.status(200).json({
        success:true,
        car
    });
});

//Update Car details =>PUT /api/cars/:id -> admin only route
export const updateCarInfo = asyncCatch(async(req,res,next)=>{

    const car = await Car.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        car
    }); 
});

//Delete Car => DELETE /api/v1/cars/:id
export const deleteCar = asyncCatch(async(req,res,next)=>{

    const car = await Car.findById(req.params.id);

    if(!car){
        return next(new ErrorHandler(`Car with Id ${req.params.id} is not Registered`,400));
    }

    await Car.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true,
        message:"Car is Deleted Successfully."
    });
})

//get car by category => GET /api/v1/cars/category/:category
export const getCarCategory = asyncCatch(async(req,res,next)=>{

    let cars = [];
    const nowYear = new Date().getFullYear();
    const category = req.params.category;

    switch(category){
        case "new":
            cars = await Car.find({
                // manufacturer_year <= 2
                manufacture_year:{ $gt: nowYear-2 }  // 2 represents the years car stays as new: stops at 2 years old: 1,2
            });
            break;
        case "medium":
            cars = await Car.find({
                // 3 <= manufacturer_year <= 6
                manufacture_year:{ $gte: nowYear-5, $lte: nowYear-2 } //Start from 3 years old - 6 years old: 3,4,5 
            });
            break;
        default:
            cars = await Car.find({
                manufacture_year:{ $lt: nowYear-5 }  // start from 5 years old - Anywhere in past years: 6,7,8,9...
            });
            break;
    }


    res.status(200).json({
        success:true,
        cars
    });
})