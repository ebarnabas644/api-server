const mysql = require("mysql2");
const fs = require('fs');
// Create a connection to the database
const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: process.env.DBPORT,
  ssl: {
    ca: fs.readFileSync('././ca-certificate.crt')
  }
});
module.exports = connection;
