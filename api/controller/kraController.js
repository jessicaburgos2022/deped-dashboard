const mysql = require("mysql");
const asyncHander = require("express-async-handler");
const dotenv = require("dotenv");
const mysql_real_escape_string = require("../utils/sqlhelper");
dotenv.config();

const pool = mysql.createPool({
  database: process.env.DB_CISD,
  user: process.env.DB_CISD_USER,
  password: process.env.DB_CISD_PASSWORD,
  host: process.env.DB_CISD_HOST,
  connectionLimit: process.env.DB_CISD_CONNECTION_LIMT,
  timeout: process.env.DB_CISD_TIMEOUT,
});

const searchKRA = asyncHander(async (req, res) => {
  const { departmentid } = req.params;
  const queryString = `CALL searchKRA(${mysql_real_escape_string(departmentid)})`;
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ result: 'Failed', message: 'Query Failed' });
      return;
    }
    try {
      connection.query(queryString, (error, results) => {
        if (error) {
          res.json({ result: 'Failed', message: 'Query Failed' });
          res.end();
        } else {
          var qResult = JSON.parse(JSON.stringify(results[0]));
          res.json(qResult);
          res.end();
        }
      });
    } catch (error) {
      res.json({ result: 'Failed', message: 'Query Failed' });
      res.end();
    }
    connection.release();
  });
});


const insertKRA = asyncHander(async (req, res) => {
  const { outputtypeid, departmentid, name, description } = req.body;
  const queryString = `CALL InsertKRA('${mysql_real_escape_string(outputtypeid)}','${mysql_real_escape_string(departmentid)}','${mysql_real_escape_string(name)}','${mysql_real_escape_string(description)}')`;
  console.log(queryString)
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ result: 'Failed', message: 'Query Failed' });
      return;
    }
    try {
      connection.query(queryString, (error, results) => {
        if (error) {
          res.json({ result: 'Failed', message: 'Query Failed' });
          res.end();
        } else {
          var qResult = JSON.parse(JSON.stringify(results[0][0]));
          res.json(qResult);
          res.end();
        }
      });
    } catch (error) {
      res.json({ result: 'Failed', message: 'Query Failed' });
      res.end();
    }
    connection.release();
  });
});


const editKRA = asyncHander(async (req, res) => {
  const { kraid, outputtypeid, name, description } = req.body;
  const queryString = `CALL EditKRA('${mysql_real_escape_string(kraid)}','${mysql_real_escape_string(outputtypeid)}','${mysql_real_escape_string(name)}','${mysql_real_escape_string(description)}')`;
  console.log(queryString)
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ result: 'Failed', message: 'Query Failed' });
      return;
    }
    try {
      connection.query(queryString, (error, results) => {
        if (error) {
          res.json({ result: 'Failed', message: 'Query Failed' });
          res.end();
        } else {
          var qResult = JSON.parse(JSON.stringify(results[0][0]));
          res.json(qResult);
          res.end();
        }
      });
    } catch (error) {
      res.json({ result: 'Failed', message: 'Query Failed' });
      res.end();
    }
    connection.release();
  });
});
module.exports = { searchKRA, insertKRA, editKRA };
