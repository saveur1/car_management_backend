/*
                ADMIN AND OPERATORS ONLY
*/
import express from "express";
const router = express.Router();
import {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaffById,
  deleteStaffById,
  getStaffByPosition,
} from "../controllers/staffController.js";
import { CheckAuth, CheckRole } from "../middlewares/CheckAuth.js";

//staff routes, a whole CRUD for staff
//Check authentication first then check user role
router.route("/")
      .post(CheckAuth, CheckRole("admin", "operators"), createStaff)
      .get(CheckAuth, CheckRole("admin", "operators"),getAllStaff);
router.route("/position/:position").get(CheckAuth, CheckRole("admin", "operators"),getStaffByPosition);

router
  .route("/:id")
  .get(CheckAuth, CheckRole("admin", "operators"), getStaffById)
  .put(CheckAuth, CheckRole("admin", "operators"), updateStaffById)
  .delete(CheckAuth, CheckRole("admin", "operators"),deleteStaffById);

export default router;
