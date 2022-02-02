import db from "../services/db.js";

const getPayments = (req, res) => {
  const { status, datetime } = req.query;

  const sql = `
    SELECT *
    FROM payments
    WHERE ( status = ? OR ? IS NULL )
      AND ( datetime = ? OR ? IS NULL )
  `;

  try {
    const data = db.query(sql, [status, status, datetime, datetime]);
    res.json({ payments: data });
  } catch (error) {
    console.error("Error getting Payments:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const paymentsController = {
  getPayments,
};

export default paymentsController;
