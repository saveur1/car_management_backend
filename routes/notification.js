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
    CheckRole("admin", "user", "operators", "manager", "accountant","CEO"),
    createNotification
  )
  .get(
    CheckAuth,
    CheckRole("admin", "user", "operators", "manager", "accountant","CEO"),
    getAllNotifications
  );

router
  .route("/:id")
  .get(
    CheckAuth,
    CheckRole("admin", "user", "operators", "manager", "accountant","CEO"),
    getNotification
  )
  .patch(
    CheckAuth,
    CheckRole("admin", "user", "operators", "manager", "accountant","CEO"),
    updateNotification
  )
  .delete(
    CheckAuth,
    CheckRole("admin", "user", "operators", "manager", "accountant","CEO"),
    deleteNotification
  );

export default router;
