import express from 'express';
const router = express.Router();
import { upload } from '../middlewares/imagesUpload.js';

// Import the controllers (userController.js) to use its database functions.
import {
    registerCar,
    getAllCars,
    getCarDetails,
    updateCarInfo,
    deleteCar
} from "../controllers/carController.js";

import { CheckAuth, CheckRole } from '../middlewares/CheckAuth.js';

//register file that allows to upload images to 'uploads' folder
router.route("/cars/create").post(upload.array("images",10), registerCar);

//cars routes, awhole CRUD for cars
router.route("/cars").get(getAllCars);
router.route("/cars/:id").get(getCarDetails)
                          .put(upload.array("images",10), updateCarInfo)
                          .delete(deleteCar);


export default router;