import express from 'express';
const router = express.Router();
import { upload } from '../middlewares/imagesUpload.js';

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
    deleteUser
} from "../controllers/userController.js";

import { CheckAuth, CheckRole } from '../middlewares/CheckAuth.js';

//register file that allows to upload images to 'uploads' folder
router.route("/register").post(upload.single("avatar"), registerUser);

//Authentication part for car rental system
router.route("/login").post(loginUser);
router.route("/password/forgot").post(userForgotPassword);
router.route("/password/reset/:token").put(userResetPassword);
router.route("/logout").get(logoutUser);

router.route("/profile").get(CheckAuth,getUserProfile);
router.route("/profile/update").put(CheckAuth,updateUserProfile);
router.route("/password/update").put(CheckAuth, updateUserPassword);

//users routes, awhole CRUD for users
router.route("/users").get(getAllUsers);
router.route("/users/:id").get(getUserDetails)
                          .put(upload.single("avatar"), updateUserInfo)
                          .delete(deleteUser);


export default router;