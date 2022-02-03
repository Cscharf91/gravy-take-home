import express from "express";
import paymentsRoutes from "./routes/payments.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/payments", paymentsRoutes);
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
