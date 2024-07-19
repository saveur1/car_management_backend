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
  .post(CheckAuth, CheckRole("admin", "operators","CEO"), createActivity)
  .get(CheckAuth, CheckRole("admin", "operators","CEO"), getAllActivities);

router
  .route("/staff/:staffId")
  .get(CheckAuth, CheckRole("admin", "operators","CEO"), getActivitiesByStaff);

export default router;
