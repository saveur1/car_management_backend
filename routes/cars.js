/*
                ADMIN, MANAGER, HUMAN RESOURCES AND OPERATORS ONLY
*/

import express from 'express';
const router = express.Router();

// Import the controllers (userController.js) to use its database functions.
import {
    registerCar,
    getAllCars,
    getCarDetails,
    updateCarInfo,
    deleteCar,
    getCarCategory,
    currentStatusCar
} from "../controllers/carController.js";

import { CheckAuth, CheckRole } from '../middlewares/CheckAuth.js';

router.route("/cars/create")
            .post(CheckAuth, CheckRole("admin", "operators", "manager"), registerCar);

//cars routes, a whole CRUD for cars
//Check authentication first then check user role
router.route("/cars")
            .get(CheckAuth, CheckRole("admin", "operators", "manager", "human_resources"), getAllCars);

router.route("/cars/:id")
            .get(CheckAuth,    CheckRole("admin", "operators", "manager", "human_resources"), getCarDetails)
            .put(CheckAuth,    CheckRole("admin", "operators", "manager"), updateCarInfo)
            .delete(CheckAuth, CheckRole("admin", "manager"), deleteCar);

router.route("/cars/category/:category")
            .get(CheckAuth, CheckRole("admin", "operators", "manager", "human_resources"), getCarCategory);

router.route("/cars/status/:status")
            .get(CheckAuth, CheckRole("admin", "operators", "manager", "human_resources"), currentStatusCar);

export default router;