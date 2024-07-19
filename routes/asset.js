/*
                    ADMIN, OPERATORS, ACCOUNTANT, CEO AND MANAGER
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
  .post(CheckAuth, CheckRole("admin", "operators","manager","CEO"), createAsset)
  .get(CheckAuth, CheckRole("admin", "operators", "manager","accountant","CEO"), getAllAssets);

router
  .route("/:id")
  .get(CheckAuth,    CheckRole("admin", "operators", "manager","accountant","CEO"), getAsset)
  .put(CheckAuth,    CheckRole("admin", "operators", "manager","CEO"), updateAsset)
  .delete(CheckAuth, CheckRole("admin", "manager", "CEO"), deleteAsset);

export default router;
