import express from "express";
import paymentsRoutes from "./routes/payments.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/payments", paymentsRoutes);

const PORT = process.env.NODE_ENV === "test" ? 3000 : 5000;

app.listen(PORT, () => {
  if (PORT === 5000) console.log(`Server listening on ${PORT}`);
});

export default app;
