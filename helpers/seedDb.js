const seedDb = (db) => {
  db.prepare(
    "CREATE TABLE IF NOT EXISTS payments (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, amount_cents INTEGER NOT NULL, datetime INTEGER NOT NULL, status TEXT NOT NULL)"
  ).run([]);

  db.prepare("DELETE FROM payments").run([]);

  db.prepare(
    "INSERT INTO payments (name, email, amount_cents, datetime, status) VALUES (?, ?, ?, ?, ?)"
  ).run(["Cory Scharf", "cscharf91@gmail.com", 5000, 1643846400, "success"]);

  db.prepare(
    "INSERT INTO payments (name, email, amount_cents, datetime, status) VALUES (?, ?, ?, ?, ?)"
  ).run(["Ryan Scharf", "rscharf@gmail.com", 15000, 1642248000, "failed"]);
};

export default seedDb;
