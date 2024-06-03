/*                      ADMIN AND HUMAN RESOURCES 
*/
import express from 'express';
const router = express.Router();

// Import the controllers (userController.js) to use its database functions.
import { 
    registerUser, 
    loginUser, 
    logoutUser,
    userForgotPassword, 
    userResetPassword, 
    getUserProfile, 
    updateUserPassword, 
    updateUserProfile,
    getAllUsers,
    getUserDetails,
    updateUserInfo,
    deleteUser,
    getUserByCategory
} from "../controllers/userController.js";

import { CheckAuth, CheckRole } from '../middlewares/CheckAuth.js';

//Authentication part for car rental system
router.route("/login").post(loginUser);
router.route("/password/forgot").post(userForgotPassword);
router.route("/password/reset/:token").put(userResetPassword);
router.route("/logout").get(logoutUser);

router.route("/profile").get(CheckAuth,getUserProfile);
router.route("/profile/update").put(CheckAuth,updateUserProfile);
router.route("/password/update").put(CheckAuth, updateUserPassword);

//users routes, awhole CRUD for users
router.route("/users").get(CheckAuth, CheckRole("admin","human_resources"), getAllUsers); //get all users
router.route("/register").post(registerUser); //register user
router.route("/users/category/:category").get(CheckAuth, CheckRole("admin", "human_resources"), getUserByCategory); 
router.route("/users/:id").get(CheckAuth, CheckRole("admin", "human_resources"), getUserDetails)
                          .put(CheckAuth, CheckRole("admin", "human_resources"), updateUserInfo)
                          .delete(CheckAuth, CheckRole("admin", "human_resources"), deleteUser);


export default router;