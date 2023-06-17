import express from "express";
import {
  getUserInfo,
  getIcons,
  getTransaction,
  getTransactions,
  deleteTransaction,
  getChartIncomesVsExpenses,
  getChartWeekExpenses,
} from "../db/index.js";

const router = express.Router();
const MAIN_TEMPLATE = "transactions";

router.get("/", (req, res) => {
  const queryParams = req.query;
  res.render("transaction-list", {
    transactions: getTransactions(queryParams),
    layout: false,
  });
});

router.get("/add/:category", (req, res) => {
  const category = req.params.category;

  const userInfo = getUserInfo();
  const icons = getIcons();

  res.render(MAIN_TEMPLATE, {
    ...userInfo,
    icons,
    category,
  });
});

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const userInfo = getUserInfo();
  const icons = getIcons();

  const transaction = getTransaction(id);

  res.render(MAIN_TEMPLATE, {
    ...userInfo,
    icons,
    transaction,
  });
});

router.post("/", (req, res) => {
  //   const { id, description, icon, amount } = req.body;
  const { id } = req.body;
  let error = false;
  if (id) {
    // Edit
  } else {
    // Add
  }
  res.json({ error });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  res.json(deleteTransaction(id));
});

router.get("/charts", (_req, res) => {
  res.json({
    incomesVsExpenses: getChartIncomesVsExpenses(),
    weekExpenses: getChartWeekExpenses(),
  });
});

export default router;
