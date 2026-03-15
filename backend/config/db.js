import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "3569",
  database: "merobyapar",
  port: 3306
});

db.connect((err) => {
  if (err) console.error("Database connection error:", err);
  else console.log("MySQL Connected");
});

export default db;