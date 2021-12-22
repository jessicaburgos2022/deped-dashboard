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

const listDepartment = asyncHander(async (req, res) => {
  const queryString = `CALL ListDepartment()`;
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

const listOutputTypeId = asyncHander(async (req, res) => {
  const queryString = `SELECT Id, Name, Description, CASE WHEN IsActive THEN 1 ELSE 0 END AS IsActive FROM ref_outputtype`;
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
          var qResult = JSON.parse(JSON.stringify(results));
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

const listKRAByDepartmentId = asyncHander(async (req, res) => {
  const { departmentId } = req.params;
  const queryString = `call ListKRAByDepartmentId('${departmentId}')`;
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ result: 'Failed', message: 'Query Failed' });
      return;
    }
    try {
      connection.query(queryString, (error, results) => {
        var qResult = JSON.parse(JSON.stringify(results));
        if (error) {
          res.json({ result: 'Failed', message: 'Query Failed' });
        }
        else {
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

const listProjectByKRAId = asyncHander(async (req, res) => {
  const { kraId } = req.params;
  const queryString = `call ListProjectByKRAId(${kraId})`;
  console.log(queryString)
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ result: 'Failed', message: 'Query Failed' });
      return;
    }
    try {
      connection.query(queryString, (error, results) => {
        var qResult = JSON.parse(JSON.stringify(results));
        if (error) {
          res.json({ result: 'Failed', message: 'Query Failed' });
        }
        else {
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


const listProjectsByDepartmentId = asyncHander(async (req, res) => {
  const { departmentId } = req.params;
  const queryString = `call ListProjectsByDepartmentId(${departmentId})`;
  console.log(queryString)
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ result: 'Failed', message: 'Query Failed' });
      return;
    }
    try {
      connection.query(queryString, (error, results) => {
        var qResult = JSON.parse(JSON.stringify(results));
        if (error) {
          res.json({ result: 'Failed', message: 'Query Failed' });
        }
        else {
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
module.exports = { listDepartment,listOutputTypeId, listKRAByDepartmentId, listProjectByKRAId, listProjectsByDepartmentId };
