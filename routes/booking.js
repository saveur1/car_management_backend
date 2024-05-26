import express from "express";
import {
  createBooking,
  getAllBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  getBookingsByStatus,
} from "../controllers/bookingController.js";

const router = express.Router();

router
  .route("/")
  .post(createBooking)
  .get(getAllBookings)
  .get(getBookingsByStatus);

router.route("/:id").get(getBooking).patch(updateBooking).delete(deleteBooking);

export default router;
