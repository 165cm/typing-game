const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get("/words", (req, res) => {
  pool.query("SELECT * FROM words", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
