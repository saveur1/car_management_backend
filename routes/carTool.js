    /**         ADMIN, OPERATORS,CEO, ACCOUNTANT AND MANGER */

import express from "express";
import {
  createCarTool,
  getAllCarTools,
  getCarTool,
  updateCarTool,
  deleteCarTool,
} from "../controllers/carToolController.js";
import { CheckAuth, CheckRole } from "../middlewares/CheckAuth.js";

import { upload } from "../middlewares/imagesUpload.js";

const router = express.Router();

router
  .route("/")
  .post(CheckAuth, CheckRole("admin", "operators", "manager","CEO"),upload.single("photo"), createCarTool)
  .get(CheckAuth,  CheckRole("admin", "operators", "manager", "accountant", "CEO"), getAllCarTools);

router
  .route("/:id")
  .get(CheckAuth,    CheckRole("admin", "operators", "manager", "accountant", "CEO"), getCarTool)
  .patch(CheckAuth,  CheckRole("admin", "operators", "manager","CEO"), upload.single("photo"), updateCarTool)
  .delete(CheckAuth, CheckRole("admin", "manager", "CEO"), deleteCarTool);

export default router;
