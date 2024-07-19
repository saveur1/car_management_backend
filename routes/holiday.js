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
  .get(CheckAuth, CheckRole("admin", "operators","CEO"), getAllHolidays)
  .post(CheckAuth, CheckRole("admin", "operators","CEO"), createHoliday);

router
  .route("/staff/:staffId")
  .get(CheckAuth, CheckRole("admin", "operators","CEO"), getHolidaysByStaff);

router
  .route("/:id")
  .patch(CheckAuth, CheckRole("admin", "operators","CEO"), updateHoliday)
  .delete(CheckAuth, CheckRole("admin", "operators","CEO"), deleteHoliday);

export default router;
