import express from "express"
import {createPayment,getPayments,getPaymentByStaff,getPaymentById,updatePayment,deletePayment} from "../controllers/paymentController.js"
import { CheckAuth,CheckRole } from "../middlewares/CheckAuth.js";
const router = express.Router();

router.route("/").post(CheckAuth, CheckRole("admin", "operators","CEO"), createPayment)
                 .get(CheckAuth, CheckRole("admin", "operators","CEO"), getPayments);
router.route("/staff/:staffId").get(CheckAuth, CheckRole("admin", "operators","CEO"), getPaymentByStaff);

router.route("/:id").get(CheckAuth, CheckRole("admin", "operators","CEO"), getPaymentById)
                    .patch(CheckAuth, CheckRole("admin", "operators","CEO"), updatePayment)
                    .delete(CheckAuth, CheckRole("admin", "operators","CEO"), deletePayment);
export default router;
