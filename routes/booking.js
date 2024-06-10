import express from "express";
import {
  createBooking,
  getAllBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  getBookingsByStatus,
  getAllCustomersBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

router
  .route("/")
  .post(createBooking)
  .get(getAllBookings)
router.route("/status/:status").get(getBookingsByStatus);
router.route("/customer/:customer").get(getAllCustomersBookings);
// router.route("/status/:status").get((req, res, next) => {
//   console.log(`Received request for status: ${req.params.status}`);
//   next();
// }, getBookingsByStatus);
router.route("/:id").get(getBooking).patch(updateBooking).delete(deleteBooking);

export default router;
