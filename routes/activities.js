import express from "express";
import {
  getAllActivities,
  getActivitiesByStaff,
  createActivity,
} from "../controllers/activitiesController.js";
import { CheckAuth, CheckRole } from "../middlewares/CheckAuth.js";

const router = express.Router();

router
  .route("/")
  .post(CheckAuth, CheckRole("admin", "operators"), createActivity)
  .get(CheckAuth, CheckRole("admin", "operators"), getAllActivities);

router
  .route("/staff/:staffId")
  .get(CheckAuth, CheckRole("admin", "operators"), getActivitiesByStaff);

export default router;
