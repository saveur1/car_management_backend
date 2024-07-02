import express from "express";
import {
  getAllActivities,
  getActivitiesByStaff,
} from "../controllers/activitiesController.js";
import { CheckAuth, CheckRole } from "../middlewares/CheckAuth.js";

const router = express.Router();

router
  .route("/")
  .get(CheckAuth, CheckRole("admin", "operators"), getAllActivities);

router
  .route("/staff/:staffId")
  .get(CheckAuth, CheckRole("admin", "operators"), getActivitiesByStaff);

export default router;
