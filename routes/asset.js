import express from "express";
import {
  createAsset,
  getAllAssets,
  getAsset,
  updateAsset,
  deleteAsset,
} from "../controllers/assetController.js";
import { CheckAuth, CheckRole } from "../middlewares/CheckAuth.js";

const router = express.Router();

router
  .route("/")
  .post(CheckAuth, CheckRole("admin", "operators"), createAsset)
  .get(CheckAuth, CheckRole("admin", "operators"), getAllAssets);

router
  .route("/:id")
  .get(CheckAuth, CheckRole("admin", "operators"), getAsset)
  .patch(CheckAuth, CheckRole("admin", "operators"), updateAsset)
  .delete(CheckAuth, CheckRole("admin", "operators"), deleteAsset);

export default router;
