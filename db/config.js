import mysql from "mysql";
import "dotenv/config";

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

export const connectdatabase = async () => {
  // Crea una conexión a la base de datos
  const db = await mysql.createConnection(config);

  // Conecta a la base de datos
  db.connect((err) => {
    if (err) {
      console.error("Error al conectar a la base de datos:", err);
      return;
    }
    console.log("Conexión exitosa a la base de datos.");
  });
  return db;
};
