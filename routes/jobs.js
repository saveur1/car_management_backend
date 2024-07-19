/*
                ADMIN, HUMAN RESOURCES, CEO AND ACCOUNTANT ONLY
*/

import express from 'express';
const router = express.Router();

// Import the controllers (salariesController.js) to use its database functions.
import {
    registerJob,
    getAllJobs,
    getJobDetails,
    updateJobInfo,
    deleteJob,
} from "../controllers/jobsController.js";

import { CheckAuth, CheckRole } from '../middlewares/CheckAuth.js';

router.route("/")
      .get(CheckAuth, CheckRole("admin", "human_resources", "accountant", "CEO"), getAllJobs)
      .post(CheckAuth, CheckRole("admin", "human_resources","accountant"), registerJob);

//Salaries routes, a whole CRUD for salaries
//Check authentication first then check user role
router.route("/:id")
      .get(CheckAuth, CheckRole("admin", "human_resources", "accountant", "CEO"), getJobDetails)
      .put(CheckAuth, CheckRole("admin", "human_resources", "accountant", "CEO"), updateJobInfo)
      .delete(CheckAuth, CheckRole("admin", "human_resources", "accountant", "CEO"), deleteJob);



export default router;