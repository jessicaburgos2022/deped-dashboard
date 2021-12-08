const mysql = require("mysql");
const asyncHander = require("express-async-handler");
const dotenv = require("dotenv");
var Client = require("svn-spawn");
dotenv.config();

const pool = mysql.createPool({
  database: process.env.DB,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  connectionLimit: process.env.DB_CONNECTION_LIMT,
  timeout: process.env.DB_TIMEOUT,
});

const listBusinessUnit = asyncHander(async (req, res) => {
  const { isActive } = req.body;
  const queryString = `CALL sp_list_business_unit(${isActive ? isActive : 'NULL'})`;
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


const getDeploymentPerMarket = asyncHander(async (req, res) => {
  const queryString = `CALL sp_get_deployment_per_market()`;
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

const getMostDeployed = asyncHander(async (req, res) => {
  const { pageSize } = req.params;
  const queryString = `CALL sp_get_most_deployed_interface(${pageSize})`;
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
module.exports = { listBusinessUnit, getDeploymentPerMarket, getMostDeployed };
