import Booking from "../models/bookingModel.js";
import asyncCatch from "../middlewares/asyncCatch.js";

// Create a new booking
export const createBooking = asyncCatch(async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.status(201).json({
    status: "success",
    data: {
      booking,
    },
  });
});

// Get all bookings
export const getAllBookings = asyncCatch(async (req, res) => {
  const bookings = await Booking.find();
  res.status(200).json({
    status: "success",
    data: {
      bookings,
    },
  });
});

// Get a booking by ID
export const getBooking = asyncCatch(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({
      status: "fail",
      message: "No booking found with that ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
});
// Get bookings by status
export const getBookingsByStatus = asyncCatch(async (req, res) => {
    const { status } = req.params;
    const bookings = await Booking.find({ bookingStatus: status });
    res.status(200).json({
        status: 'success',
        data: {
            bookings
        }
    });
});
// Update a booking
export const updateBooking = asyncCatch(async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!booking) {
    return res.status(404).json({
      status: "fail",
      message: "No booking found with that ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
});

// Delete a booking
export const deleteBooking = asyncCatch(async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) {
    return res.status(404).json({
      status: "fail",
      message: "No booking found with that ID",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
