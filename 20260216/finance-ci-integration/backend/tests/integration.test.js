const request = require("supertest");
const app = require("../app");
const { _internal } = require("../app");

describe("Integration Tests - Personal Finance Tracker APIs", () => {
  beforeEach(() => {
    _internal._resetData();
  });

  test("Dashboard API returns correct summary data", async () => {
    const res = await request(app).get("/api/dashboard");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("totalIncome");
    expect(res.body).toHaveProperty("totalExpenses");
    expect(res.body).toHaveProperty("balance");

    expect(res.body.totalIncome).toBe(12000);
    expect(res.body.totalExpenses).toBe(800);
    expect(res.body.balance).toBe(11200);
  });

  test("Add expense updates dashboard totals", async () => {
    const addRes = await request(app)
      .post("/api/expenses")
      .send({ title: "Rent", amount: 2000 });

    expect(addRes.statusCode).toBe(201);

    const res = await request(app).get("/api/dashboard");

    expect(res.body.totalExpenses).toBe(2800);
    expect(res.body.totalIncome).toBe(12000);
    expect(res.body.balance).toBe(9200);
  });

  test("Add income updates dashboard totals", async () => {
    const addRes = await request(app)
      .post("/api/income")
      .send({ source: "Bonus", amount: 1500 });

    expect(addRes.statusCode).toBe(201);

    const res = await request(app).get("/api/dashboard");

    expect(res.body.totalExpenses).toBe(800);
    expect(res.body.totalIncome).toBe(13500);
    expect(res.body.balance).toBe(12700);
  });

  test("Expenses API supports create and fetch operations", async () => {
    const createRes = await request(app)
      .post("/api/expenses")
      .send({ title: "Utilities", amount: 450 });

    expect(createRes.statusCode).toBe(201);
    expect(createRes.body).toHaveProperty("id");
    expect(createRes.body.title).toBe("Utilities");
    expect(createRes.body.amount).toBe(450);

    const listRes = await request(app).get("/api/expenses");

    expect(listRes.statusCode).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.some((item) => item.title === "Utilities")).toBe(true);
  });

  test("Income API supports create and fetch operations", async () => {
    const createRes = await request(app)
      .post("/api/income")
      .send({ source: "Gift", amount: 800 });

    expect(createRes.statusCode).toBe(201);
    expect(createRes.body).toHaveProperty("id");
    expect(createRes.body.source).toBe("Gift");
    expect(createRes.body.amount).toBe(800);

    const listRes = await request(app).get("/api/income");

    expect(listRes.statusCode).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.some((item) => item.source === "Gift")).toBe(true);
  });
});
