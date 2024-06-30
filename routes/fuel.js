
/*
                ADMIN, OPERATORS, AND MANAGER
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
  .get(CheckAuth, CheckRole("admin", "operators", "manager"), getAllFuels);

router
  .route("/employee/:employee")
  .get(CheckAuth, CheckRole("admin", "operators", "manager"), getFuelsByEmployee);

router
  .route("/car/:carId")
  .get(CheckAuth, CheckRole("admin", "operators", "manager"), getFuelsByCar);

router
  .route("/:id")
  .get(CheckAuth,    CheckRole("admin", "operators", "manager"), getFuel)
  .put(CheckAuth,    CheckRole("admin", "operators", "manager"), updateFuel)
  .delete(CheckAuth, CheckRole("admin", "manager"), deleteFuel);

export default router;
