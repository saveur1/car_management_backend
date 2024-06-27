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
  .post(CheckAuth, CheckRole("admin", "operators"), createFuel)
  .get(CheckAuth, CheckRole("admin", "operators"), getAllFuels);

router
  .route("/employee/:employee")
  .get(CheckAuth, CheckRole("admin", "operators"), getFuelsByEmployee);

router
  .route("/car/:carId")
  .get(CheckAuth, CheckRole("admin", "operators"), getFuelsByCar);

router
  .route("/:id")
  .get(CheckAuth, CheckRole("admin", "operators"), getFuel)
  .put(CheckAuth, CheckRole("admin", "operators"), updateFuel)
  .delete(CheckAuth, CheckRole("admin", "operators"), deleteFuel);

export default router;
