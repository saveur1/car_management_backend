/*
                            ADMIN, OPERATORS, ACCOUNTANT AND MANAGER
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
  .post(CheckAuth, CheckRole("admin", "operators", "manager"), createGarage)
  .get(CheckAuth, CheckRole("admin",  "operators", "manager", "accountant"), getAllGarages);

router
  .route("/car/:car")
  .get(CheckAuth, CheckRole("admin", "operators", "manager", "accountant"), getGaragesByEmployee);

router
  .route("/:id")
  .get(CheckAuth,    CheckRole("admin", "operators", "manager", "accountant"), getGarage)
  .put(CheckAuth,    CheckRole("admin", "operators", "manager"), updateGarage)
  .delete(CheckAuth, CheckRole("admin", "manager"), deleteGarage);

export default router;
