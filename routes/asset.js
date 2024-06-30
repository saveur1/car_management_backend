/*
                    ADMIN, OPERATORS AND MANAGER
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
  .get(CheckAuth, CheckRole("admin", "operators", "manager"), getAllAssets);

router
  .route("/:id")
  .get(CheckAuth,    CheckRole("admin", "operators", "manager"), getAsset)
  .put(CheckAuth,    CheckRole("admin", "operators", "manager"), updateAsset)
  .delete(CheckAuth, CheckRole("admin", "operators", "manager"), deleteAsset);

export default router;
