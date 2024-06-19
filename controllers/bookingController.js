import Booking from "../models/bookingModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";
import Car from "../models/carsModel.js";

// Create a new booking
export const createBooking = asyncCatch(async (req, res) => {
  const booking = new Booking(req.body);

  const car = await Car.findById(req.body.car);

  //update car current status
  //update new car status depending on booking status
  switch(req.body.bookingStatus){
    case "pending":
        car.current_status = "under_use";
        break;

    case "confirm":
        car.current_status = "under_use";
        break;

    case "cancelled":
        car.current_status = "available";
        break;

    case "expired":
        car.current_status = "available";
        break;

    case "completed":
        car.current_status = "available";
        break;

    default:
        car.current_status = "under_use";
        break;
        
  }

  //save both booking and car
  await booking.save();
  await car.save();;

  res.status(201).json({
    status: "success",
    booking
  });
});

// Get all bookings
export const getAllBookings = asyncCatch(async (req, res) => {
  const bookings = await Booking.find()
                                .populate("car")
                                .populate("customer")
                                .populate("driver");
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
                               .populate("driver");
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

    const bookings = await Booking.find({ bookingStatus: status })
                                  .populate("car")
                                  .populate("customer")
                                  .populate("driver");
    
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

  if(!prevBooking){
    return next(new ErrorHandler(`No booking found with that ID`,400))
  }

  //find old car and update status
  await Car.findByIdAndUpdate(prevBooking.car, {current_status: "available"});

  //Saving new Incoming booking
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });


  //update new car status depending on booking status
  switch(req.body.bookingStatus){
    case "pending":
        await Car.findByIdAndUpdate(booking.car,{current_status: "under_use"});
        break;

    case "confirm":
        await Car.findByIdAndUpdate(booking.car,{current_status: "under_use"});
        break;

    case "cancelled":
        await Car.findByIdAndUpdate(booking.car,{current_status: "available"});
        break;

    case "expired":
        await Car.findByIdAndUpdate(booking.car,{current_status: "available"});
        break;

    case "completed":
        await Car.findByIdAndUpdate(booking.car,{current_status: "available"});
        break;
        
    default:
        await Car.findByIdAndUpdate(booking.car,{current_status: "under_use"});
        break;
        
  }


  res.status(200).json({
    status: "success",
    booking
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
  await Car.findByIdAndUpdate(booking.car,{current_status: "available"});

  //deleted booking then from database
  await Booking.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    message: "Booking was deleted successfully",
  });
});

// Get all customers bookings
export const getAllCustomersBookings = asyncCatch(async (req, res) => {
    const customer = req.params.customer;
    const bookings = await Booking.find({customer: customer})
                                  .populate("car")
                                  .populate("customer")
                                  .populate("driver");
    res.status(200).json({
      status: "success",
      bookings,
    });
});

// Get all customers bookings rented particular car
export const getAllCustomersRentedCar = asyncCatch(async (req, res) => {
    const car = req.params.car;
    const bookings = await Booking.find({car: car})
                                  .populate("car")
                                  .populate("customer")
                                  .populate("driver");
    res.status(200).json({
      status: "success",
      bookings,
    });
});
