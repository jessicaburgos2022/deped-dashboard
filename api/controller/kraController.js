const mysql = require("mysql");
const asyncHander = require("express-async-handler");
const dotenv = require("dotenv");
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
  const queryString = `CALL searchKRA()`;
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
  const {outputtypeid, departmentid, name, description} = req.body;
  const queryString = `CALL InsertKRA('${outputtypeid}','${departmentid}','${name}','${description}')`;
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
  const {kraid, outputtypeid, departmentid, name, description} = req.body;
  const queryString = `CALL EditKRA('${kraid}','${outputtypeid}','${departmentid}','${name}','${description}')`;
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
