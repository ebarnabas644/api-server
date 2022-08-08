const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");
const fs = require('fs');
// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: process.env.DBPORT,
  ssl: {
    ca: fs.readFileSync('././ca-certificate.crt')
  }
});
// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});
module.exports = connection;
