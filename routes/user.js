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

//login with email and password
router.route("/login").post(loginUser);
router.route("/password/forgot").post(userForgotPassword);
router.route("/password/reset/:token").put(userResetPassword);

router.route("/logout").get(logoutUser);

router.route("/profile").get(CheckAuth,getUserProfile);
router.route("/profile/update").put(CheckAuth,updateUserProfile);
router.route("/password/update").put(CheckAuth, updateUserPassword);

router.route("/admin/users").get(CheckAuth,CheckRole("admin"),getAllUsers);
router.route("/admin/user/:id").get(CheckAuth,CheckRole("admin"),getUserDetails)
                               .put(CheckAuth,CheckRole("admin"),updateUserInfo)
                               .delete(CheckAuth,CheckRole("admin"),deleteUser);


export default router;