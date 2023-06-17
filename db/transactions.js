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
      (transaction) =>
        (type === "expense") === transaction.amount < 0 ||
        (type === "income") === transaction.amount >= 0
    );
  }

  return transactions;
};

export const deleteTransaction = (_id) => {
  //TODO: Make a call to the database
  return { error: false };
};

export const getChartIncomesVsExpenses = () => {
  let amountIncomes = 0;
  let amountExpenses = 0;

  transactionsJSON.forEach((transaction) => {
    if (transaction.amount >= 0) {
      amountIncomes += transaction.amount;
    } else {
      amountExpenses += transaction.amount;
    }
  });

  return {
    labels: ["Ingresos", "Gastos"],
    data: [amountIncomes, amountExpenses],
  };
};

export const getChartWeekExpenses = () => {
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 6
  );

  const weekDays = [
    { day: 1, name: "Lunes" },
    { day: 2, name: "Martes" },
    { day: 3, name: "Miércoles" },
    { day: 4, name: "Jueves" },
    { day: 5, name: "Viernes" },
    { day: 6, name: "Sábado" },
    { day: 0, name: "Domingo" },
  ];
  const weekDaysOrdered = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(lastWeek);
    day.setDate(lastWeek.getDate() + i);

    const dayWeek = weekDays.find((weekday) => weekday.day === day.getDay());
    dayWeek.name += ` ${day.getDate()}`;
    dayWeek.amount = 0;

    transactionsJSON.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (
        transactionDate.getDate() === day.getDate() &&
        transactionDate.getMonth() === day.getMonth() &&
        transactionDate.getFullYear() === day.getFullYear()
      ) {
        dayWeek.amount += transaction.amount;
      }
    });

    weekDaysOrdered.push(dayWeek);
  }

  return {
    labels: weekDaysOrdered.map((day) => day.name),
    data: weekDaysOrdered.map((day) => day.amount),
  };
};
