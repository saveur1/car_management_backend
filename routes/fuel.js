
/*
                ADMIN, OPERATORS, ACCOUNTANT AND MANAGER
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
  .post(CheckAuth, CheckRole("admin", "operators", "manager"), createFuel)
  .get(CheckAuth, CheckRole("admin", "operators", "manager", "accountant"), getAllFuels);

router
  .route("/employee/:employee")
  .get(CheckAuth, CheckRole("admin", "operators", "manager"), getFuelsByEmployee);

router
  .route("/car/:carId")
  .get(CheckAuth, CheckRole("admin", "operators", "manager", "accountant"), getFuelsByCar);

router
  .route("/:id")
  .get(CheckAuth,    CheckRole("admin", "operators", "manager", "accountant"), getFuel)
  .put(CheckAuth,    CheckRole("admin", "operators", "manager"), updateFuel)
  .delete(CheckAuth, CheckRole("admin", "manager"), deleteFuel);

export default router;
