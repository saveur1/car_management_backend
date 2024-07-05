import express from "express";
const router = express.Router();
import {
  sendMessage,
  getAllChats,
  getChatById,
  updateChat,
  deleteChat,
} from "../controllers/chatController.js";
import { CheckAuth, CheckRole } from "../middlewares/CheckAuth.js";
import { upload } from "../middlewares/imagesUpload.js";

router
  .route("/")
  .post(
    CheckAuth,
    CheckRole("admin", "operators", "manager", "human_resources", "accountant"),
    upload.array("attachments", 5),
    sendMessage
  )
  .get(
    CheckAuth,
    CheckRole("admin", "operators", "manager", "human_resources", "accountant"),
    getAllChats
  );

router
  .route("/:id")
  .get(
    CheckAuth,
    CheckRole("admin", "operators", "manager", "human_resources", "accountant"),
    getChatById
  )
  .put(
    CheckAuth,
    CheckRole("admin", "operators", "manager", "human_resources", "accountant"),
    updateChat
  )
  .delete(
    CheckAuth,
    CheckRole("admin", "operators", "manager", "human_resources", "accountant"),
    deleteChat
  );

export default router;
