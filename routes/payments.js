import { Router } from "express";
import paymentsController from "../controllers/paymentsController.js";

const router = Router();

router.get("/", paymentsController.getPayments);
router.post("/", paymentsController.createPayment);

export default router;
