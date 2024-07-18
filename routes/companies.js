/*
                    ADMIN ONLY AND ONLY
*/

import express from "express";
import {
  createCompany,
  getAllCompanys,
  getCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController.js";
import { CheckAuth, CheckRole } from "../middlewares/CheckAuth.js";
import { upload } from "../middlewares/imagesUpload.js";

const router = express.Router();

router
  .route("/")
  .post(CheckAuth, CheckRole("admin"), upload.single("company_logo"), createCompany)
  .get(CheckAuth, CheckRole("admin"), getAllCompanys);

router
  .route("/:id")
  .get(CheckAuth,    CheckRole("admin"), getCompany)
  .patch(CheckAuth,    CheckRole("admin"), upload.single("company_logo"), updateCompany)
  .delete(CheckAuth, CheckRole("admin"), deleteCompany);

export default router;
