    /*         ADMIN, OPERATOR AND MANAGER*/
import express from "express";
import {
  createBooking,
  getAllBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  getBookingsByStatus,
  getAllCustomersBookings,
  getAllCustomersRentedCar,
} from "../controllers/bookingController.js";
import { CheckAuth, CheckRole } from "../middlewares/CheckAuth.js";

const router = express.Router();

router
  .route("/")
  .post(CheckAuth, CheckRole("admin", "operators", "manager"), createBooking)
  .get(CheckAuth, CheckRole("admin", "operators", "manager"), getAllBookings);
router
  .route("/status/:status")
  .get(CheckAuth, CheckRole("admin", "operators", "manager"), getBookingsByStatus);

//get all bookings held by particular user id
router
  .route("/customer/:customer")
  .get(CheckAuth, CheckRole("admin", "operators", "manager"), getAllCustomersBookings);

//get all bookings held by particular car id
router
  .route("/car/:car")
  .get(CheckAuth, CheckRole("admin", "operators", "manager"), getAllCustomersRentedCar);

router
  .route("/:id")
  .get(CheckAuth,    CheckRole("admin", "operators", "manager"), getBooking)
  .patch(CheckAuth,  CheckRole("admin", "operators", "manager"), updateBooking)
  .delete(CheckAuth, CheckRole("admin", "operators", "manager"), deleteBooking);

export default router;
