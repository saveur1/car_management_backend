import asyncCatch from "../middlewares/asyncCatch.js";
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