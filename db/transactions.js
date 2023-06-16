import * as fs from "fs";
import { formatMoney } from "../utils/index.js";

const transactionsJSON = JSON.parse(
  fs.readFileSync("./db/files/transactions.json")
);

export const addExpense = (_expense) => {
  //TODO: Make a call to the database
};

export const getTransaction = (id) => {
  //TODO: Make a call to the database
  const transactions = transactionsJSON.map((transaction) => ({
    ...transaction,
    displayAmount: formatMoney(transaction.amount),
  }));

  return transactions.find((transaction) => `${transaction.id}` === id);
};

export const getTransactions = () => {
  //TODO: Make a call to the database
  const transactions = transactionsJSON.map((transaction) => ({
    ...transaction,
    displayAmount: formatMoney(transaction.amount),
  }));

  return transactions;
};
