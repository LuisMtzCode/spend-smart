import express from "express";
import {
  getUserInfo,
  getIcons,
  getTransaction,
  getTransactions,
} from "../db/index.js";

const router = express.Router();
const MAIN_TEMPLATE = "transactions";

router.get("/", (_req, res) => {
  res.send(getTransactions());
});

router.get("/add", (_req, res) => {
  const userInfo = getUserInfo();
  const icons = getIcons();

  res.render(MAIN_TEMPLATE, {
    ...userInfo,
    icons,
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

export default router;
