/*                      ADMIN, MANAGER, CEO, ACCOUNTANT AND HUMAN RESOURCES 
*/
import express from 'express';
const router = express.Router();

// Import the controllers (userController.js) to use its database functions.
import { 
    registerUser, 
    getAllUsers,
    getUserDetails,
    updateUserInfo,
    deleteUser,
    getUserByCategory,
    getUserByRole
} from "../controllers/userController.js";

import { upload } from "../middlewares/imagesUpload.js";

import { CheckAuth, CheckRole } from '../middlewares/CheckAuth.js';

//users routes, awhole CRUD for users
router.route("/users")
            .get(CheckAuth, CheckRole("admin", "operators", "human_resources","manager", "accountant", "CEO"), getAllUsers); //get all users

router.route("/register")
            .post(CheckAuth, CheckRole("admin", "operators", "human_resources","manager"), upload.single("avatar"), registerUser); //register user

router.route("/users/category/:category")
            .get(CheckAuth, CheckRole("admin", "operators", "human_resources","manager", "accountant", "CEO"), getUserByCategory);

router.route("/users/role/:role")
            .get(CheckAuth, CheckRole("admin", "operators", "human_resources","manager", "accountant", "CEO"), getUserByRole);

//get single User, delete and update
router.route("/users/:id").get(CheckAuth,   CheckRole("admin", "operators", "human_resources","manager", "accountant", "CEO"), getUserDetails)
                          .put(CheckAuth,   CheckRole("admin", "operators", "human_resources","manager","CEO"), upload.single("avatar"), updateUserInfo)
                          .delete(CheckAuth,CheckRole("admin", "human_resources","manager", "CEO"), deleteUser);  //Operator not allowed to delete anything


export default router;