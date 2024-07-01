/*                      ADMIN, MANAGER, ACCOUNTANT AND HUMAN RESOURCES 
*/
import express from 'express';
const router = express.Router();

// Import the controllers (userController.js) to use its database functions.
import { 
    registerUser, 
    logoutUser,
    getUserProfile, 
    updateUserPassword, 
    updateUserProfile,
    getAllUsers,
    getUserDetails,
    updateUserInfo,
    deleteUser,
    getUserByCategory,
    getUserByRole
} from "../controllers/userController.js";

import { CheckAuth, CheckRole } from '../middlewares/CheckAuth.js';

//Authentication part for car rental system
router.route("/logout").get(logoutUser);

router.route("/profile").get(CheckAuth,getUserProfile);
router.route("/profile/update").put(CheckAuth,updateUserProfile);
router.route("/password/update").put(CheckAuth, updateUserPassword);

//users routes, awhole CRUD for users
router.route("/users")
            .get(CheckAuth, CheckRole("admin", "operators", "human_resources","manager", "accountant"), getAllUsers); //get all users

router.route("/register")
            .post(CheckAuth, CheckRole("admin", "operators", "human_resources","manager"), registerUser); //register user

router.route("/users/category/:category")
            .get(CheckAuth, CheckRole("admin", "operators", "human_resources","manager", "accountant"), getUserByCategory);

router.route("/users/role/:role")
            .get(CheckAuth, CheckRole("admin", "operators", "human_resources","manager", "accountant"), getUserByRole);

//get single User, delete and update
router.route("/users/:id").get(CheckAuth,   CheckRole("admin", "operators", "human_resources","manager", "accountant"), getUserDetails)
                          .put(CheckAuth,   CheckRole("admin", "operators", "human_resources","manager"), updateUserInfo)
                          .delete(CheckAuth,CheckRole("admin", "human_resources","manager"), deleteUser);  //Operator not allowed to delete anything


export default router;