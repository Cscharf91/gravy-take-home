import { Router } from "express";
import paymentsController from "../controllers/paymentsController.js";

const router = Router();

router.get("/", paymentsController.getPayments);
router.get("/:id", paymentsController.getPaymentById);
router.post("/", paymentsController.createPayment);
router.patch("/:id", paymentsController.updatePayment);
router.delete("/:id", paymentsController.deletePayment);

export default router;
