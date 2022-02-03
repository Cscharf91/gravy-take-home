import isValidDate from "../helpers/isValidDate.js";
import db from "../services/db.js";

const getPayments = (req, res) => {
  const { date, status } = req.query;
  const jsDate = new Date(date);
  if (date && !isValidDate(jsDate)) {
    res.json({
      error:
        "Invalid date provided. Must be in format YYYY-MM-DD and a valid calendar date.",
    });
  } else {
    const sql = `
      SELECT *
      FROM payments
      WHERE ( status = ? OR ? IS NULL )
        AND ( strftime('%Y-%m-%d', date(datetime, 'unixepoch')) = ? OR ? IS NULL )
    `;

    try {
      const data = db.query(sql, [status, status, date, date]);
      res.json({ payments: data });
    } catch (error) {
      console.error("Error getting payments:", error.message);
      res.status(400).json({ error: error.message });
    }
  }
};

// ! END OF ORIGINAL PROMPT -- EXTRA ROUTES BEGIN HERE

const getPaymentSql = `
    SELECT *
    FROM payments
    WHERE id = ?
  `;

const getPaymentById = (req, res) => {
  const { id } = req.params;

  try {
    const [data] = db.query(getPaymentSql, [id]);

    if (data) {
      res.json({ payment: data });
    } else {
      res.json({ error: "No payment with that ID exists" });
    }
  } catch (error) {
    console.error("Error getting payment:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const createPayment = (req, res) => {
  const { name, email, amount_cents, date, status } = req.body;
  try {
    validatePayment(name, email, amount_cents, date, status);

    const sql = `
    INSERT INTO payments (name, email, amount_cents, datetime, status)
    VALUES (?, ?, ?, strftime('%s', ?), ?)
  `;

    const result = db.run(sql, [name, email, amount_cents, date, status]);
    if (result.changes) {
      const [data] = db.query(getPaymentSql, [result.lastInsertRowid]);
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

const updatePayment = (req, res) => {
  const { id } = req.params;
  const { name, email, amount_cents, date, status } = req.body;

  const sql = `
    UPDATE payments
    SET name = COALESCE(?, name),
        email = COALESCE(?, email),
        amount_cents = COALESCE(?, amount_cents),
        datetime = COALESCE(strftime('%s', ?), datetime),
        status = COALESCE(?, status)
    WHERE id = ?
  `;

  try {
    const result = db.run(sql, [name, email, amount_cents, date, status, id]);
    if (result.changes) {
      const [data] = db.query(getPaymentSql, [id]);
      res.json({ payment: data });
    } else {
      res.json({ error: "No changes were made to payment" });
    }
  } catch (error) {
    console.error("Error editing payment:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const deletePayment = (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE
    FROM payments
    WHERE id = ?
  `;

  try {
    const result = db.run(sql, [id]);
    if (result.changes) {
      res.sendStatus(200);
    } else {
      res.json({ error: "Error deleting payment" });
    }
  } catch (error) {
    console.error("Error deleting payment:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const paymentsController = {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};

export default paymentsController;
