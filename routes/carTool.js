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
  .post(CheckAuth, CheckRole("admin", "operators"),upload.single("photo"), createCarTool)
  .get(CheckAuth, CheckRole("admin", "operators"), getAllCarTools);

router
  .route("/:id")
  .get(CheckAuth, CheckRole("admin", "operators"), getCarTool)
  .patch(CheckAuth, CheckRole("admin", "operators"), updateCarTool)
  .delete(CheckAuth, CheckRole("admin", "operators"), deleteCarTool);

export default router;
