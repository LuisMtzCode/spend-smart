import * as fs from "fs";
import { formatMoney } from "../utils/index.js";

const transactionsJSON = JSON.parse(
  fs.readFileSync("./db/files/transactions.json")
);

export const addExpense = (_expense) => {
  //TODO: Make a call to the database
  return { error: false };
};

export const editExpense = (_expense) => {
  //TODO: Make a call to the database
  return { error: false };
};

export const getTransaction = (id) => {
  //TODO: Make a call to the database
  const transactions = transactionsJSON.map((transaction) => ({
    ...transaction,
    displayAmount: formatMoney(transaction.amount),
  }));

  return transactions.find((transaction) => `${transaction.id}` === id);
};

export const getTransactions = (queryParams) => {
  //TODO: Make a call to the database
  const { type } = queryParams;
  let transactions = transactionsJSON.map((transaction) => ({
    ...transaction,
    displayAmount: formatMoney(transaction.amount),
  }));

  if (type) {
    transactions = transactions.filter(
      (transaction) => transaction.type === type
    );
  }

  return transactions;
};

export const deleteTransaction = (_id) => {
  //TODO: Make a call to the database
  return { error: false };
};
