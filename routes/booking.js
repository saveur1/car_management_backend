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
import { CheckAuth, CheckRole } from "../middlewares/CheckAuth.js";

const router = express.Router();

router
  .route("/")
  .post(CheckAuth, CheckRole("admin", "operators"), createBooking)
  .get(CheckAuth, CheckRole("admin", "operators"), getAllBookings);
router
  .route("/status/:status")
  .get(CheckAuth, CheckRole("admin", "operators"), getBookingsByStatus);
router
  .route("/customer/:customer")
  .get(CheckAuth, CheckRole("admin", "operators"), getAllCustomersBookings);
router
  .route("/:id")
  .get(CheckAuth, CheckRole("admin", "operators"), getBooking)
  .patch(CheckAuth, CheckRole("admin", "operators"), updateBooking)
  .delete(CheckAuth, CheckRole("admin", "operators"), deleteBooking);

export default router;
