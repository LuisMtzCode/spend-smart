import express from "express";
import {
  getUserInfo,
  getIcons,
  getTransaction,
  getTransactions,
  addExpense,
  editExpense,
  deleteTransaction,
  getChartIncomesVsExpenses,
  getChartWeekExpenses,
} from "../db/index.js";

const router = express.Router();
const MAIN_TEMPLATE = "transactions";

router.get("/", async (req, res) => {
  const queryParams = req.query;
  res.render("transaction-list", {
    transactions: await getTransactions(queryParams),
    layout: false,
  });
});

router.get("/add/:category", async (req, res) => {
  const category = req.params.category;

  const userInfo = await getUserInfo();
  const icons = await getIcons();

  res.render(MAIN_TEMPLATE, {
    ...userInfo,
    icons,
    category,
  });
});

router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const userInfo = await getUserInfo();
  const icons = await getIcons();

  const transaction = await getTransaction(id);

  res.render(MAIN_TEMPLATE, {
    ...userInfo,
    icons,
    transaction,
  });
});

router.post("/", async (req, res) => {
  const { id } = req.body;
  if (id) {
    // Edit
    res.json(await editExpense(req.body));
  } else {
    // Add
    res.json(await addExpense(req.body));
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  res.json(await deleteTransaction(id));
});

router.get("/charts", async (_req, res) => {
  res.json({
    incomesVsExpenses: await getChartIncomesVsExpenses(),
    weekExpenses: await getChartWeekExpenses(),
  });
});

export default router;
