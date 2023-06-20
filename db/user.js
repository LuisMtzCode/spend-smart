import { connectdatabase } from "./config.js";
import { formatMoney } from "../utils/index.js";

export const getUserInfo = () => {
  return new Promise((resolve, _reject) => {
    // Realiza la consulta SQL para obtener la información del usuario

    const query = "SELECT SUM(amount) AS moneyAvailable FROM transactions;"; // Actualiza la consulta según tu estructura de base de datos y los datos que deseas obtener
    connectdatabase().then((db) => {
      // Ejecuta la consulta en la base de datos
      db.query(query, function (error, result, _fields) {
        if (error) throw error;

        // Obtiene el resultado de la consulta
        const userInfo = result[0];
        userInfo.moneyAvailable = formatMoney(userInfo.moneyAvailable);
        resolve(userInfo);
      });
    });
  });
};

export const getExpensesCategories = () => {
  return new Promise((resolve, _reject) => {
    // Realiza la consulta SQL para obtener las categorías de gastos

    const query = "SELECT * FROM expenses_categories;"; // Actualiza la consulta según tu estructura de base de datos y los datos que deseas obtener
    connectdatabase().then((db) => {
      // Ejecuta la consulta en la base de datos
      db.query(query, function (error, result, _fields) {
        if (error) throw error;

        // Obtiene el resultado de la consulta
        const expensesCategories = result;
        resolve(expensesCategories);
      });
    });
  });
};
