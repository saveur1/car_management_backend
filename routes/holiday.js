import express from "express";
import {
  getAllHolidays,
  getHolidaysByStaff,
  createHoliday,
  updateHoliday,
  deleteHoliday,
} from "../controllers/holidayController.js";
import { CheckAuth, CheckRole } from "../middlewares/CheckAuth.js";

const router = express.Router();

router
  .route("/")
  .get(CheckAuth, CheckRole("admin", "operators"), getAllHolidays)
  .post(CheckAuth, CheckRole("admin", "operators"), createHoliday);

router
  .route("/staff/:staffId")
  .get(CheckAuth, CheckRole("admin", "operators"), getHolidaysByStaff);

router
  .route("/:id")
  .patch(CheckAuth, CheckRole("admin", "operators"), updateHoliday)
  .delete(CheckAuth, CheckRole("admin", "operators"), deleteHoliday);

export default router;
