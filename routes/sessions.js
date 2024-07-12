/*
                NoNe
*/
import express from "express";
const router = express.Router();
import {
    createSession,
} from "../controllers/sessionController.js";

//AUTHENTICATION: Doesn't require any specific permissions
router.route("/").post(createSession);
  
export default router;
