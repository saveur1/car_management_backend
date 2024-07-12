/*
                NoNe
*/
import express from "express";
const router = express.Router();
import {
    linkAccount,
    unlinkAccount
} from "../controllers/accountController.js";

//AUTHENTICATION: Doesn't require any specific permissions
router.route("/link").post(linkAccount);
router.route("/unlink").post(unlinkAccount);
  
export default router;
