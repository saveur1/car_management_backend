import express from "express";
import {
  createNotification,
  getAllNotifications,
  getNotification,
  updateNotification,
  deleteNotification,
} from "../controllers/notificationController.js";
import { CheckAuth, CheckRole } from "../middlewares/CheckAuth.js";

const router = express.Router();

router
  .route("/")
  .post(
    CheckAuth,
    CheckRole("admin", "user", "operators", "manager", "accountant"),
    createNotification
  )
  .get(
    CheckAuth,
    CheckRole("admin", "user", "operators", "manager", "accountant"),
    getAllNotifications
  );

router
  .route("/:id")
  .get(
    CheckAuth,
    CheckRole("admin", "user", "operators", "manager", "accountant"),
    getNotification
  )
  .patch(
    CheckAuth,
    CheckRole("admin", "user", "operators", "manager", "accountant"),
    updateNotification
  )
  .delete(
    CheckAuth,
    CheckRole("admin", "user", "operators", "manager", "accountant"),
    deleteNotification
  );

export default router;
