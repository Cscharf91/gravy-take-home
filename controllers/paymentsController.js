import db from "../services/db.js";

const getPayments = (req, res) => {
  const { date, status } = req.query;
  const unixDatetime = Date.parse(date);

  const sql = `
    SELECT *
    FROM payments
    WHERE ( status = ? OR ? IS NULL )
      AND ( datetime = ? OR ? IS NULL )
  `;

  try {
    const data = db.query(sql, [status, status, unixDatetime, unixDatetime]);
    res.json({ payments: data });
  } catch (error) {
    console.error("Error getting Payments:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// ! END OF ORIGINAL PROMPT -- EXTRA ROUTES BEGIN HERE

const getPaymentById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT *
    FROM payments
    WHERE id = ?
  `;

  try {
    const [data] = db.query(sql, [id]);

    if (data) {
      res.json({ payment: data });
    } else {
      res.json({ error: "No payment with that ID exists" });
    }
  } catch (error) {
    console.error("Error getting Payment:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const createPayment = (req, res) => {
  const { name, email, amount_cents, date, status } = req.body;
  validatePayment(name, email, amount_cents, date, status);
  const unixDatetime = Date.parse(date);

  const sqlCreate = `
    INSERT INTO payments (name, email, amount_cents, datetime, status)
    VALUES (?, ?, ?, ?, ?)
  `;
  const sqlGet = `
    SELECT *
    FROM payments
    WHERE id = ?
  `;

  try {
    const insert = db.run(sqlCreate, [
      name,
      email,
      amount_cents,
      unixDatetime,
      status,
    ]);
    if (insert.changes) {
      const [data] = db.query(sqlGet, [insert.lastInsertRowid]);
      res.json({ payment: data });
    } else {
      res.json({ error: "Error creating payment" });
    }
  } catch (error) {
    console.error("Error creating Payments:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const validatePayment = (name, email, amount_cents, date, status) => {
  // Missing plenty of cases, but just meant to provide a basic level of validation.

  const messages = [];

  if (!name) messages.push("No name is provided.");
  if (!email) messages.push("No email is provided.");
  if (email && !email?.includes("@")) messages.push("Invalid email provided");
  if (!amount_cents) messages.push("No amount (in cents) is provided.");
  if (amount_cents && amount_cents % 1 !== 0)
    messages.push("Invalid amount. Must be in cents");
  if (!date) messages.push("No datetime is provided.");
  if (!status) messages.push("No status is provided.");
  if (status && status !== "success" && status !== "failed")
    messages.push("Status must be 'success' or 'failed'");

  if (messages.length) throw new Error(messages.join(" "));
};

const paymentsController = {
  getPayments,
  getPaymentById,
  createPayment,
};

export default paymentsController;
