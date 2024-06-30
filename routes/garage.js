/*
                            ADMIN AND MANAGER
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
  .get(CheckAuth, CheckRole("admin",  "operators", "manager"), getAllGarages);

router
  .route("/employee/:employee")
  .get(CheckAuth, CheckRole("admin", "operators", "manager"), getGaragesByEmployee);

router
  .route("/:id")
  .get(CheckAuth,    CheckRole("admin", "operators", "manager"), getGarage)
  .put(CheckAuth,    CheckRole("admin", "operators", "manager"), updateGarage)
  .delete(CheckAuth, CheckRole("admin", "operators", "manager"), deleteGarage);

export default router;
