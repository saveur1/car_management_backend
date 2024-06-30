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
  loginStaff,
  userForgotPassword,
  userResetPassword
} from "../controllers/staffController.js";
import { CheckAuth, CheckRole } from "../middlewares/CheckAuth.js";

import { upload } from "../middlewares/imagesUpload.js";

//AUTHENTICATION: Doesn't require any specific permissions
router.route("/login").post(loginStaff);
router.route("/password/forgot").post(userForgotPassword);
router.route("/password/reset").put(userResetPassword);

//staff routes, a whole CRUD for staff
//Check authentication first then check user role
router.route("/")
      .post(CheckAuth, CheckRole("admin", "human_resources", "accountant"), upload.single("image"), createStaff) //create staff
      .get(CheckAuth, CheckRole("admin", "human_resources", "accountant"), getAllStaff);

router.route("/position/:position")
      .get(CheckAuth, CheckRole("admin", "human_resources", "accountant"), getStaffByPosition);

router.route("/jobtype/:jobtype")
      .get(CheckAuth, CheckRole("admin", "human_resources", "accountant"), getStaffByJobType)


router
  .route("/:id")
  .get(CheckAuth, CheckRole("admin", "human_resources", "accountant"), getStaffById)
  .put(CheckAuth, CheckRole("admin", "human_resources", "accountant"), upload.single("image"), updateStaffById)
  .delete(CheckAuth, CheckRole("admin", "human_resources", "accountant"), deleteStaffById);

export default router;
