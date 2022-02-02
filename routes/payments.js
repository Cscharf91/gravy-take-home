import { Router } from "express";
import paymentsController from "../controllers/paymentsController.js";

const router = Router();

router.get("/", paymentsController.getPayments);

export default router;
