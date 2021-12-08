const mysql = require("mysql");
const asyncHander = require("express-async-handler");
const dotenv = require("dotenv");
const moment = require("moment");
dotenv.config();

const pool = mysql.createPool({
  database: process.env.DB,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  connectionLimit: process.env.DB_CONNECTION_LIMT,
  timeout: process.env.DB_TIMEOUT,
});

const getTicketByInterface = asyncHander(async (req, res) => {
  const { interface } = req.params;
  const queryString = `CALL sp_get_ticket_by_interface('${interface}')`;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(400).json({ message: "Network Error" });
      return;
    }
    try {
      connection.query(queryString, (error, results) => {
        if (error) {
          res.sendStatus(500).json({ message: "Failed to query" });
          res.end();
        } else {
          res.json(results[0]);
          connection.destroy();
        }
      });
    } catch (error) {
      res.status(400).json({ message: "Network Error" });
      res.end();
    }
    connection.release();
  });
});

const listTicketType = asyncHander(async (req, res) => {
  const { status } = req.params;
  const queryString = `CALL sp_list_ticket_type(${status ? status : 'NULL'})`;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(400).json({ message: "Network Error" });
      return;
    }
    try {
      connection.query(queryString, (error, results) => {
        if (error) {
          res.sendStatus(500).json({ message: "Failed to query" });
          res.end();
        } else {
          res.json(results[0]);
          connection.destroy();
        }
      });
    } catch (error) {
      res.status(400).json({ message: "Network Error" });
      res.end();
    }
    connection.release();
  });
});
module.exports = {
  getTicketByInterface,
  listTicketType
};
