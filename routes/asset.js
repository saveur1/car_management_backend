/*
                    ADMIN, OPERATORS, ACCOUNTANT AND MANAGER
*/

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
  .post(CheckAuth, CheckRole("admin", "operators","manager"), createAsset)
  .get(CheckAuth, CheckRole("admin", "operators", "manager","accountant"), getAllAssets);

router
  .route("/:id")
  .get(CheckAuth,    CheckRole("admin", "operators", "manager","accountant"), getAsset)
  .put(CheckAuth,    CheckRole("admin", "operators", "manager"), updateAsset)
  .delete(CheckAuth, CheckRole("admin", "manager"), deleteAsset);

export default router;
