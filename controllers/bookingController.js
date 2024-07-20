import Booking from "../models/bookingModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";
import Car from "../models/carsModel.js";
import Activities from '../models/activityModel.js';


// Create a new booking
export const createBooking = asyncCatch(async (req, res) => {
  const booking = new Booking({...req.body, company: req.staff.company });
  let status = "Incoming";

  const car = await Car.findById(req.body.car);

  //update car current status
  //update new car status depending on booking status
  switch(req.body.bookingStatus){
    case "pending":
        car.current_status = "waiting";
        break;

    case "confirm":
        car.current_status = "taken";
        status = "Live";
        break;

    case "cancelled":
        car.current_status = "available";
        status = "Cancelled";
        break;

    default:
        break;
        
  }

  car.available_after = booking.returnDate;

  //add new activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Created Booking",
    color: "blue",
    status: status,
    company: req.staff.company,
    date: new Date(Date.now())
  });

  //save both booking and car
  await booking.save();
  await car.save();

  res.status(201).json({
    status: "success",
    booking
  });
});

// Get all bookings
export const getAllBookings = asyncCatch(async (req, res) => {
  const bookings = await Booking.find({company: req.staff.company})
                                .populate("car")
                                .populate({
                                    path: "car",
                                    populate:{
                                        path: "supplier",
                                        model:"User"
                                    }
                                })
                                .populate("customer")
                                .populate("driver")
                                .sort({createdAt: -1});
  res.status(200).json({
    status: "success",
    bookings,
  });
});

// Get a booking by ID
export const getBooking = asyncCatch(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
                               .populate("car")
                               .populate("customer")
                               .populate("driver")
                               .sort({createdAt: -1});
  if (!booking) {
    return res.status(404).json({
      status: "fail",
      message: "No booking found with that ID",
    });
  }
  res.status(200).json({
    status: "success",
    booking,
  });
});
// Get bookings by status
export const getBookingsByStatus = asyncCatch(async (req, res) => {
    const { status } = req.params;

    const bookings = await Booking.find({ bookingStatus: status, company: req.staff.company })
                                  .populate("car")
                                  .populate("customer")
                                  .populate("driver")
                                  .sort({createdAt: -1});
    
    // update car status
    res.status(200).json({
        status: 'success',
        bookings
    });
});
// Update a booking
export const updateBooking = asyncCatch(async (req, res) => {
  //get previous booking first
  const prevBooking = await Booking.findById(req.params.id);
  let status = "Incoming";

  if (!prevBooking) {
    return next(new ErrorHandler(`No booking found with that ID`, 400));
  }

  //find old car and update status
  await Car.findByIdAndUpdate(prevBooking.car, { current_status: "available" });

  //Saving new Incoming booking
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  //update new car status depending on booking status
  switch (req.body.bookingStatus) {
    case "pending":
      await Car.findByIdAndUpdate(booking.car, { current_status: "waiting", available_after: booking.returnDate });
      break;

    case "confirm":
      await Car.findByIdAndUpdate(booking.car, { current_status: "taken", available_after: booking.returnDate });
      status = "Live";
      break;

    case "cancelled":
      await Car.findByIdAndUpdate(booking.car, { current_status: "available", available_after: new Date() });
      status = "Cancelled";
      break;

    case "expired":
      await Car.findByIdAndUpdate(booking.car, { current_status: "available", available_after: new Date() });
      break;

    case "completed":
      await Car.findByIdAndUpdate(booking.car, { current_status: "available", available_after: new Date() });
      status = "Completed";
      break;

    default:
      break;
  }

  //update activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Updated Booking",
    color: "yellow",
    status: status,
    company: req.staff.company,
    date: new Date(Date.now())
  });

  res.status(200).json({
    status: "success",
    booking,
  });
});

// Delete a booking
export const deleteBooking = asyncCatch(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({
      status: "fail",
      message: "No booking found with that ID",
    });
  }

  //find car ID and make it's status available to be booked
  await Car.findByIdAndUpdate(booking.car, { current_status: "available" });

  //delete all activities for this booking
  await Activities.deleteMany({$and:{ booking: booking._id, company: req.staff.company }});

  //deleted booking then from database
  await Booking.findByIdAndDelete(req.params.id);

  //delete activies
  await Activities.create({
    staff: req.staff._id,
    activityName: "Deleted Booking",
    company: req.staff.company,
    color: "red"
  });
  
  res.status(204).json({
    status: "success",
    message: "Booking was deleted successfully",
  });
});

// Get all customers bookings
export const getAllCustomersBookings = asyncCatch(async (req, res) => {
    const customer = req.params.customer;
    const bookings = await Booking.find({customer: customer, company: req.staff.company})
                                  .populate("car")
                                  .populate("customer")
                                  .populate("driver")
                                  .sort({createdAt: -1});
    res.status(200).json({
      status: "success",
      bookings,
    });
});

// Get all customers bookings rented particular car
export const getAllCustomersRentedCar = asyncCatch(async (req, res) => {
    const car = req.params.car;
    const bookings = await Booking.find({car: car, company: req.staff.company})
                                  .populate("car")
                                  .populate("customer")
                                  .populate("driver")
                                  .sort({createdAt: -1});
    res.status(200).json({
      status: "success",
      bookings,
    });
});
