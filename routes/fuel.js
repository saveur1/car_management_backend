
/*
                ADMIN, OPERATORS,CEO, ACCOUNTANT AND MANAGER
*/
import express from "express";
import {
  createFuel,
  getAllFuels,
  getFuel,
  updateFuel,
  deleteFuel,
  getFuelsByEmployee,
  getFuelsByCar,
} from "../controllers/fuelController.js";
import { CheckAuth, CheckRole } from "../middlewares/CheckAuth.js";

const router = express.Router();

router
  .route("/")
  .post(CheckAuth, CheckRole("admin", "operators", "manager","CEO"), createFuel)
  .get(CheckAuth, CheckRole("admin", "operators", "manager", "accountant", "CEO"), getAllFuels);

router
  .route("/employee/:employee")
  .get(CheckAuth, CheckRole("admin", "operators", "manager","CEO"), getFuelsByEmployee);

router
  .route("/car/:carId")
  .get(CheckAuth, CheckRole("admin", "operators", "manager", "accountant", "CEO"), getFuelsByCar);

router
  .route("/:id")
  .get(CheckAuth,    CheckRole("admin", "operators", "manager", "accountant", "CEO"), getFuel)
  .put(CheckAuth,    CheckRole("admin", "operators", "manager","CEO"), updateFuel)
  .delete(CheckAuth, CheckRole("admin", "manager", "CEO"), deleteFuel);

export default router;
