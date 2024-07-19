/*
                            ADMIN, OPERATORS,CEO, ACCOUNTANT AND MANAGER
*/

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
  .post(CheckAuth, CheckRole("admin", "operators", "manager","CEO"), createGarage)
  .get(CheckAuth, CheckRole("admin",  "operators", "manager", "accountant", "CEO"), getAllGarages);

router
  .route("/car/:car")
  .get(CheckAuth, CheckRole("admin", "operators", "manager", "accountant", "CEO"), getGaragesByEmployee);

router
  .route("/:id")
  .get(CheckAuth,    CheckRole("admin", "operators", "manager", "accountant", "CEO"), getGarage)
  .put(CheckAuth,    CheckRole("admin", "operators", "manager","CEO"), updateGarage)
  .delete(CheckAuth, CheckRole("admin", "manager", "CEO"), deleteGarage);

export default router;
