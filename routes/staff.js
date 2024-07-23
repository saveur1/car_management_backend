/*
                ADMIN, HUMAN RESOURCES, CEO AND ACCOUNTANT ONLY
                OPERATORS: fetch all staffs only
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
  userResetPassword,
  getUserProfile,
  updateUserPassword,
  getStaffEmail
} from "../controllers/staffController.js";
import { CheckAuth, CheckRole } from "../middlewares/CheckAuth.js";

import { upload } from "../middlewares/imagesUpload.js";

//AUTHENTICATION: Doesn't require any specific permissions
router.route("/login").post(loginStaff);
router.route("/password/forgot").post(userForgotPassword);
router.route("/password/reset").put(userResetPassword);

router.route("/profile").get(CheckAuth,getUserProfile);
router.route("/password/update").put(CheckAuth, updateUserPassword);

//staff routes, a whole CRUD for staff
//Check authentication first then check user role
router.route("/")
      .post(CheckAuth, CheckRole("admin", "human_resources", "accountant", "CEO"), upload.single("image"), createStaff) //create staff
      .get(CheckAuth, CheckRole("admin", "human_resources", "accountant", "operators", "CEO", "manager"), getAllStaff);

router.route("/position/:position")
      .get(CheckAuth, CheckRole("admin", "human_resources", "accountant", "operators", "CEO"), getStaffByPosition);

router.route("/jobtype/:jobtype")
      .get(CheckAuth, CheckRole("admin", "human_resources", "accountant", "operators", "CEO"), getStaffByJobType)

router.route("/email")
      .get(CheckAuth, CheckRole("admin", "human_resources", "accountant", "operators", "CEO"), getStaffEmail);

router
  .route("/:id")
  .get(CheckAuth, CheckRole("admin", "human_resources", "accountant", "CEO"), getStaffById)
  .put(CheckAuth, CheckRole("admin", "human_resources", "accountant", "CEO"), upload.single("image"), updateStaffById)
  .delete(CheckAuth, CheckRole("admin", "human_resources", "accountant", "CEO"), deleteStaffById);
  
export default router;
