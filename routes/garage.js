import express from "express";
import {
  createGarage,
  getAllGarages,
  getGarage,
  updateGarage,
  deleteGarage,
  getGaragesByEmployee,
} from "../controllers/garageController.js";
import { CheckAuth, CheckRole } from "../middlewares/CheckAuth.js";

const router = express.Router();

router
  .route("/")
  .post(CheckAuth, CheckRole("admin", "operators"), createGarage)
  .get(CheckAuth, CheckRole("admin", "operators"), getAllGarages);

router
  .route("/employee/:employee")
  .get(CheckAuth, CheckRole("admin", "operators"), getGaragesByEmployee);

router
  .route("/:id")
  .get(CheckAuth, CheckRole("admin", "operators"), getGarage)
  .patch(CheckAuth, CheckRole("admin", "operators"), updateGarage)
  .delete(CheckAuth, CheckRole("admin", "operators"), deleteGarage);

export default router;
