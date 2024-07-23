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
  createStaff,
  getAllStaffCEO,
} from "../controllers/companyController.js";
import { CheckAuth, CheckRole } from "../middlewares/CheckAuth.js";
import { upload } from "../middlewares/imagesUpload.js";

const router = express.Router();

router
  .route("/")
  .post(CheckAuth, CheckRole("admin"), upload.single("company_logo"), createCompany)
  .get(CheckAuth, CheckRole("admin"), getAllCompanys);

router.route("/CEO")
      .post(CheckAuth, CheckRole("admin"), upload.single("image"), createStaff);
    
router.route("/CEO/:company")
      .get(CheckAuth, CheckRole("admin"), getAllStaffCEO);

router
  .route("/:id")
  .get(CheckAuth,    CheckRole("admin"), getCompany)
  .patch(CheckAuth,    CheckRole("admin"), upload.single("company_logo"), updateCompany)
  .delete(CheckAuth, CheckRole("admin"), deleteCompany);

export default router;
