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

const router = express.Router();

router
  .route("/")
  .post(CheckAuth, CheckRole("admin"), createCompany)
  .get(CheckAuth, CheckRole("admin"), getAllCompanys);

router
  .route("/:id")
  .get(CheckAuth,    CheckRole("admin"), getCompany)
  .put(CheckAuth,    CheckRole("admin"), updateCompany)
  .delete(CheckAuth, CheckRole("admin"), deleteCompany);

export default router;
