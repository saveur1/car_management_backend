/*
                ADMIN, HUMAN RESOURCES, CEO AND ACCOUNTANT ONLY
*/

import express from 'express';
const router = express.Router();

// Import the controllers (salariesController.js) to use its database functions.
import {
    registerSalary,
    getAllSalaries,
    getSalaryDetails,
    updateSalaryInfo,
    deleteSalary,
} from "../controllers/salariesController.js";

import { CheckAuth, CheckRole } from '../middlewares/CheckAuth.js';

router.route("/")
      .get(CheckAuth, CheckRole("admin", "human_resources", "accountant", "CEO"), getAllSalaries)
      .post(CheckAuth, CheckRole("admin", "human_resources","accountant", "CEO"), registerSalary);

//Salaries routes, a whole CRUD for salaries
//Check authentication first then check user role
router.route("/:id")
      .get(CheckAuth, CheckRole("admin", "human_resources","accountant", "CEO"), getSalaryDetails)
      .put(CheckAuth, CheckRole("admin", "human_resources", "accountant", "CEO"), updateSalaryInfo)
      .delete(CheckAuth, CheckRole("admin", "human_resources", "accountant", "CEO"), deleteSalary);



export default router;