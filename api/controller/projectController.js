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

const searchProject = asyncHander(async (req, res) => {
  const { departmentid } = req.params;
  const queryString = `CALL searchProject(${departmentid})`;
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


const insertProject = asyncHander(async (req, res) => {
  const { kraid, project } = req.body;
  const queryString = `CALL InsertProject('${kraid}','${mysql_real_escape_string(project)}')`;
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


const editProject = asyncHander(async (req, res) => {
  const { kraid, projectid, name } = req.body;
  const queryString = `CALL editProject('${projectid}','${kraid}','${mysql_real_escape_string(name)}')`;
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



module.exports = { searchProject, insertProject, editProject };
