# Gravy Take Home Challenge

By Cory Scharf

---

This is a simple CRUD API created in Express.js for the Gravy take home challenge. After completing the prompt, I decided to add a few extra routes since I had most of the logic set up.

## Get Started:

You must have npm installed.

To install node_modules:

```
npm i
yarn
```

To start the server:

```
npm run start
yarn start
```

## Payment Routes:

| URL                  | Collection | Method | Parameters                                                                                                                      | Response        | Action                                     |
| -------------------- | ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------ |
| /api/v1/payments/    | payments   | GET    | **status**: "success" or "failed", **date**: ISO format datetime (ex: "2022-01-31T00:00:00.000Z")                               | JSON with Array | Get a list of payments in the database     |
| /api/v1/payments/    | payments   | POST   | **name**: string, **email**: string, **amount_cents**: number, **date**: string (ISO format), **status**: "success" or "failed" | JSON            | Add JSON into the database                 |
| /api/v1/payments/:id | payments   | PATCH  | id, JSON (same properties as POST request)                                                                                      | JSON            | Update the document with sent JSON data    |
| /api/v1/payments/:id | payments   | GET    | id                                                                                                                              | JSON            | Return the payment from id                 |
| /api/v1/payments/:id | payments   | DELETE | id                                                                                                                              | status 200      | Delete the payment, related to the sent id |

## Important Files:

- **app.js**: runs the express server.
- **/routes/payments.js**: a list of all the endpoints, which call the controller functions.
- **/controllers/paymentsController.js**: the controller, functions which handle the CRUD operations.
- **/services/db.js**: the only file that directly accesses the database, used in controller to make SQL queries.
