/*
                ADMIN AND OPERATORS ONLY
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

router.route("/cars/create").post(CheckAuth, CheckRole("admin", "operators"), registerCar);

//cars routes, a whole CRUD for cars
//Check authentication first then check user role
router.route("/cars").get(CheckAuth, CheckRole("admin", "operators"), getAllCars);
router.route("/cars/:id").get(CheckAuth, CheckRole("admin", "operators"), getCarDetails)
                          .put(CheckAuth, CheckRole("admin", "operators"), updateCarInfo)
                          .delete(CheckAuth, CheckRole("admin", "operators"), deleteCar);

router.route("/cars/category/:category").get(CheckAuth, CheckRole("admin", "operators"), getCarCategory);
router.route("/cars/status/:status").get(CheckAuth, CheckRole("admin", "operators"), currentStatusCar);

export default router;