import express from "express";
import {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaffById,
  deleteStaffById,
  getStaffByPosition,
} from "../controllers/staffController.js";
import { upload } from "../middlewares/imagesUpload.js";

const router = express.Router();

router.route("/").post(upload.single("image"), createStaff)
                 .get(getAllStaff);
router.route("/position/:position").get(getStaffByPosition);

router.route("/:id")
  .get(getStaffById)
  .put(upload.single("image"), updateStaffById)
  .delete(deleteStaffById);


export default router;

