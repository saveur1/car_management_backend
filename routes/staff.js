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
  getStaffByJobType,
  loginStaff
} from "../controllers/staffController.js";
import { CheckAuth, CheckRole } from "../middlewares/CheckAuth.js";

//AUTHENTICATION
router.route("/login").post(loginStaff);

//staff routes, a whole CRUD for staff
//Check authentication first then check user role
router.route("/")
      .post(createStaff) //create staff
      .get(CheckAuth, CheckRole("admin", "operators"),getAllStaff);

router.route("/position/:position")
      .get(CheckAuth, CheckRole("admin", "operators"),getStaffByPosition);

router.route("/jobtype/:jobtype")
      .get(CheckAuth, CheckRole("admin", "operators"), getStaffByJobType)


router
  .route("/:id")
  .get(CheckAuth, CheckRole("admin", "operators"), getStaffById)
  .put(CheckAuth, CheckRole("admin", "operators"), updateStaffById)
  .delete(CheckAuth, CheckRole("admin", "operators"),deleteStaffById);

export default router;
