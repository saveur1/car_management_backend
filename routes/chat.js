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
    CheckRole("admin", "operators", "manager", "human_resources", "accountant", "CEO"),
    upload.array("attachments", 5),
    sendMessage
  )
  .get(
    CheckAuth,
    CheckRole("admin", "operators", "manager", "human_resources", "accountant", "CEO"),
    getAllChats
  );

router
  .route("/:id")
  .get(
    CheckAuth,
    CheckRole("admin", "operators", "manager", "human_resources", "accountant", "CEO"),
    getChatById
  )
  .put(
    CheckAuth,
    CheckRole("admin", "operators", "manager", "human_resources", "accountant", "CEO"),
    updateChat
  )
  .delete(
    CheckAuth,
    CheckRole("admin", "operators", "manager", "human_resources", "accountant", "CEO"),
    deleteChat
  );

export default router;
