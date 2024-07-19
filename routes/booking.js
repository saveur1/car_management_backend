    /*         ADMIN, OPERATOR, HUMAN RESOURCES, CEO AND MANAGER*/
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
  .post(CheckAuth, CheckRole("admin", "operators", "manager", "human_resources", "CEO"), createBooking)
  .get(CheckAuth,  CheckRole("admin", "operators", "manager", "human_resources", "accountant", "CEO"), getAllBookings);
router
  .route("/status/:status")
  .get(CheckAuth, CheckRole("admin", "operators", "manager", "human_resources", "accountant", "CEO"), getBookingsByStatus);

//get all bookings held by particular user id
router
  .route("/customer/:customer")
  .get(CheckAuth, CheckRole("admin", "operators", "manager", "human_resources", "accountant", "CEO"), getAllCustomersBookings);

//get all bookings held by particular car id
router
  .route("/car/:car")
  .get(CheckAuth, CheckRole("admin", "operators", "manager", "human_resources", "accountant", "CEO"), getAllCustomersRentedCar);

router
  .route("/:id")
  .get(CheckAuth,    CheckRole("admin", "operators", "manager", "human_resources", "accountant", "CEO"), getBooking)
  .patch(CheckAuth,  CheckRole("admin", "operators", "manager","CEO"), updateBooking)
  .delete(CheckAuth, CheckRole("admin", "operators", "manager","CEO"), deleteBooking);

export default router;
