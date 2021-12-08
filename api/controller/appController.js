const mysql = require("mysql");
const asyncHander = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
  database: process.env.DB_CISD,
  user: process.env.DB_CISD_USER,
  password: process.env.DB_CISD_PASSWORD,
  host: process.env.DB_CISD_HOST,
  connectionLimit: process.env.DB_CISD_CONNECTION_LIMT,
  timeout: process.env.DB_CISD_TIMEOUT,
});

const listOutputTypeId = asyncHander(async (req, res) => {
  const queryString = `SELECT Id, Name, Description, CASE WHEN IsActive THEN 1 ELSE 0 END AS IsActive FROM ref_outputtype`;
  
  connection.query(queryString, (error, results) => {
    if (error) {
      res.json({ result: 'Failed', message: 'Query Failed' });
    }
    else {
      var qResult = JSON.parse(JSON.stringify(results));
      res.json(qResult);
    }

  })
});

const listKRAByDepartmentId = asyncHander(async (req, res) => {
  const { departmentId, outputTypeId } = req.params;
  const queryString = `call ListKRAByDepartmentId('${departmentId}', '${outputTypeId}')`;
  console.log(queryString)
  connection.query(queryString, (error, results) => {
    var qResult = JSON.parse(JSON.stringify(results));
    if (error) {
      res.json({ result: 'Failed', message: 'Query Failed' });
    }
    else {
      var qResult = JSON.parse(JSON.stringify(results[0]));
      res.json(qResult);
    }
  })
});

module.exports = { listOutputTypeId, listKRAByDepartmentId };
