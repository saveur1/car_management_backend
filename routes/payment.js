import express from "express"
import {createPayment,getPayments,getPaymentByStaff,getPaymentById,updatePayment,deletePayment} from "../controllers/paymentController.js"
import { CheckAuth,CheckRole } from "../middlewares/CheckAuth";
const router = express.Router();

router.route("/").post(CheckAuth, CheckRole("admin", "operators"), createPayment)
                 .get(CheckAuth, CheckRole("admin", "operators"), getPayments);
router.route("/staff/:staffId").get(CheckAuth, CheckRole("admin", "operators"), getPaymentByStaff);

router.route("/:id").get(CheckAuth, CheckRole("admin", "operators"), getPaymentById)
                    .patch(CheckAuth, CheckRole("admin", "operators"), updatePayment)
                    .delete(CheckAuth, CheckRole("admin", "operators"), deletePayment);
export default router;
