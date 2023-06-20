import { connectdatabase } from "./config.js";
import { formatMoney } from "../utils/index.js";

export const addExpense = (expense) => {
  return new Promise((resolve, reject) => {
    const { description, icon, amount } = expense;
    console.log(description, icon, amount);
    const date = new Date().toISOString().slice(0, 10);
    // SQL insert query
    const insertQuery = `
          INSERT INTO transactions (description, icon, amount, date)
          VALUES (?, ?, ?, ?);
        `;
    connectdatabase().then((db) => {
      // Parameters for the SQL query
      const insertParams = [description, icon, amount, date];

      // Execute the SQL query
      db.query(insertQuery, insertParams, (error, _result) => {
        if (error) {
          console.error("Error al insertar la transacción:", error);
          reject({ error: true });
        }

        console.log("Transacción insertada correctamente");
        resolve({ error: false });
      });
    });
  });
};

export const editExpense = (expense) => {
  return new Promise((resolve, reject) => {
    const { id, description, icon, amount } = expense;

    // SQL update query
    const updateQuery = `UPDATE transactions SET description = ?, amount = ?, icon = ? WHERE id = ?`;
    const updateParams = [description, amount, icon, id];

    // Execute the SQL query
    connectdatabase().then((db) => {
      db.query(updateQuery, updateParams, (error, _result) => {
        if (error) {
          console.error("Error al actualizar la transacción:", error);
          reject({ error: true });
        }

        console.log("Transacción actualizada correctamente");
        resolve({ error: false });
      });
    });
  });
};

export const getTransaction = (id) => {
  return new Promise((resolve, reject) => {
    // SQL query to get a transaction by its ID
    const selectQuery = `SELECT * FROM transactions WHERE id = ?`;
    const selectParams = [id];

    connectdatabase().then((db) => {
      // Execute the SQL query
      db.query(selectQuery, selectParams, (error, result) => {
        if (error) {
          console.error("Error al obtener la transacción:", error);
          reject(null);
        }

        const transaction = result[0];
        if (transaction) {
          const formattedTransaction = {
            ...transaction,
            displayAmount: formatMoney(transaction.amount),
          };
          resolve(formattedTransaction);
        }

        resolve(null);
      });
    });
  });
};

export const getTransactions = (queryParams) => {
  return new Promise((resolve, reject) => {
    const { type } = queryParams;

    // SQL query to get all transactions
    let selectQuery = `SELECT * FROM transactions`;
    let selectParams = [];

    if (type) {
      // SQL query with filter by type (income or expense)
      selectQuery += ` WHERE amount ${type === "income" ? ">=" : "<"} 0`;
    }

    connectdatabase()
      .then((db) => {
        // Execute the SQL query
        db.query(selectQuery, selectParams, (error, result) => {
          if (error) {
            console.error("Error al obtener las transacciones:", error);
            reject([]);
          }

          const transactions = result.map((transaction) => ({
            ...transaction,
            displayAmount: formatMoney(transaction.amount),
          }));

          resolve(transactions);
        });
      })
      .catch((error) => {
        console.error("Error al conectar con la base de datos:", error);
        reject([]);
      });
  });
};

export const deleteTransaction = (id) => {
  return new Promise((resolve, reject) => {
    // SQL query to delete a transaction by its ID
    const deleteQuery = `DELETE FROM transactions WHERE id = ?`;
    const deleteParams = [id];

    // Execute the SQL query
    connectdatabase()
      .then((db) => {
        db.query(deleteQuery, deleteParams, (error, _result) => {
          if (error) {
            console.error("Error al eliminar la transacción:", error);
            reject({ error: true });
          }

          console.log("Transacción eliminada correctamente");
          resolve({ error: false });
        });
      })
      .catch((error) => {
        console.error("Error al conectar con la base de datos:", error);
        reject({ error: true });
      });
  });
};

export const getChartIncomesVsExpenses = () => {
  return new Promise((resolve, reject) => {
    // SQL query to get the sum of incomes and expenses
    const sumQuery = `
      SELECT 
        SUM(CASE WHEN amount >= 0 THEN amount ELSE 0 END) AS totalIncomes,
        SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END) AS totalExpenses
      FROM transactions
    `;

    // Execute the SQL query
    connectdatabase()
      .then((db) => {
        db.query(sumQuery, (error, result) => {
          if (error) {
            console.error(
              "Error al obtener los totales de ingresos y gastos:",
              error
            );
            reject(null);
          }

          const { totalIncomes, totalExpenses } = result[0];

          resolve({
            labels: ["Ingresos", "Gastos"],
            data: [totalIncomes, totalExpenses],
          });
        });
      })
      .catch((error) => {
        console.error("Error al conectar con la base de datos:", error);
        reject(null);
      });
  });
};

export const getChartWeekExpenses = () => {
  return new Promise((resolve, reject) => {
    const query = `
          SELECT * FROM transactions
        `;
    connectdatabase().then((db) => {
      db.query(query, (error, result) => {
        if (error) {
          console.error(
            "Error al obtener los totales de ingresos y gastos:",
            error
          );
          reject(null);
        }

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

          const dayWeek = weekDays.find(
            (weekday) => weekday.day === day.getDay()
          );
          dayWeek.name += ` ${day.getDate()}`;
          dayWeek.amount = 0;

          result.forEach((transaction) => {
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

        resolve({
          labels: weekDaysOrdered.map((day) => day.name),
          data: weekDaysOrdered.map((day) => day.amount),
        });
      });
    });
  });
};
