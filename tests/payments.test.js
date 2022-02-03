import app from "../app";
import Database from "better-sqlite3";
import request from "supertest";
import seedDb from "../helpers/seedDb";

const db = new Database(":memory:");

beforeAll(() => {
  process.env.NODE_ENV = "test";
});

describe("GET /api/v1/payments", () => {
  test("get all payments", async () => {
    db.serialize({}, async () => {
      seedDb(db);
      const res = await request(app).get("/api/v1/payments");
      const response = {
        payments: [
          {
            id: 1,
            name: "Cory Scharf",
            email: "cscharf91@gmail.com",
            amount_cents: 5000,
            datetime: 1643846400,
            status: "success",
          },
          {
            id: 2,
            name: "Ryan Scharf",
            email: "rscharf@gmail.com",
            amount_cents: 15000,
            datetime: 1642248000,
            status: "failed",
          },
        ],
      };
      expect(res.status).toBe(200);
      expect(res.body).toEqual(response);
    });
  });

  test("get payments by date", async () => {
    db.serialize({}, async () => {
      seedDb(db);
      const res = await request(app).get("/api/v1/payments?date=2022-02-03");
      const response = {
        payments: [
          {
            id: 1,
            name: "Cory Scharf",
            email: "cscharf91@gmail.com",
            amount_cents: 5000,
            datetime: 1643846400,
            status: "success",
          },
        ],
      };
      expect(res.status).toBe(200);
      expect(res.body).toEqual(response);
    });
  });
});
