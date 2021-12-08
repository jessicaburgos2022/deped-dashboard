const mysql = require("mysql");
const asyncHander = require("express-async-handler");
const dotenv = require("dotenv");
const moment = require("moment");
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

const getSVNInformation = asyncHander(async (req, res) => {
  try {
    var client = new Client({
      username: process.env.SVN_USER,
      password: process.env.SVN_PWD
    });
    client.getLog(req.body.path, function (err, data) {
      try {
        if (err) {
          res.sendStatus(500).json({ message: "Failed to query" });
          res.end();
        } else {
          var qResult = [];
          if (Array.isArray(data[0])) {
            res.json(data[0]);
          } else {
            qResult.push(data[0]);
            res.json(qResult);
          }
        }
      } catch (e) {
        res.sendStatus(500).json({ message: "Failed to query" });
        res.end();
      }
    });
  } catch (e) {
    res.sendStatus(500).json({ message: "Failed to query" });
    res.end();
  }
});
const searchInterface = asyncHander(async (req, res) => {
  const { BusinessUnit, ObjectId, InterfaceId, InterfaceName } = req.body.param;
  const queryString = `CALL sp_search_interface(${BusinessUnit ? BusinessUnit : 0
    }, '${ObjectId ? ObjectId : ""}', '${InterfaceId ? InterfaceId : ""}', '${InterfaceName ? InterfaceName : ""
    }')`;
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
const insertInterface = asyncHander(async (req, res) => {
  const {
    BusinessUnit,
    ObjectID,
    InterfaceName,
    InterfaceDescription,
    SVNPath,
    DateDeployed,
    UserID,
  } = req.body.param;
  const queryString = `CALL sp_insert_interface(${BusinessUnit ? BusinessUnit : 0
    }, '${ObjectID}', '${InterfaceName}', '${InterfaceDescription}', ${DateDeployed
      ? `STR_TO_DATE('${moment(DateDeployed).format("MM/DD/YYYY")}','%m/%d/%Y')`
      : "NULL"
    }, '${SVNPath}', '${UserID}')`;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(400).json({ message: "Network Error" });
      return;
    }
    try {
      connection.query(queryString, (error, results) => {
        if (error) {
          console.log(error);
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
const updateInterface = asyncHander(async (req, res) => {
  const {
    UId,
    BusinessUnit,
    ObjectID,
    InterfaceName,
    InterfaceDescription,
    SVNPath,
    IsActive,
    DateDeployed,
    UserID,
  } = req.body.param;
  const queryString = `CALL sp_edit_interface(${UId}, ${BusinessUnit ? BusinessUnit : 0
    }, '${ObjectID}', '${InterfaceName}', '${InterfaceDescription}', ${IsActive}, ${DateDeployed
      ? `STR_TO_DATE('${moment(DateDeployed).format("MM/DD/YYYY")}','%m/%d/%Y')`
      : "NULL"
    }, '${SVNPath}', '${UserID}')`;
  console.log(queryString);
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(400).json({ message: "Network Error" });
      return;
    }
    try {
      connection.query(queryString, (error, results) => {
        if (error) {
          console.log(error);
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

const deleteInterface = asyncHander(async (req, res) => {
  const { InterfaceId, UserId } = req.body.param;
  const queryString = `CALL sp_delete_interface(${InterfaceId}, '${UserId}')`;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(400).json({ message: "Network Error" });
      return;
    }
    try {
      connection.query(queryString, (error, results) => {
        if (error) {
          console.log(error);
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

const deleteMultipleInterface = asyncHander(async (req, res) => {
  const { InterfaceId, UserId } = req.body.param;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(400).json({ message: "Network Error" });
      return;
    }
    try {
      InterfaceId &&
        Array.isArray(InterfaceId) &&
        InterfaceId.map((r) => {
          connection.query(
            `CALL sp_delete_interface(${r}, '${UserId}')`,
            (error, results) => {
              if (error) {
                res.sendStatus(500).json({ message: "Failed to query" });
                res.end();
              }
            }
          );
        });
      res.json({Message:"Success|E2E Service(s) successfully deleted."});
    } catch (error) {
      res.status(400).json({ message: "Network Error" });
      res.end();
    }
    connection.release();
  });
});

const insertTask = asyncHander(async (req, res) => {
  const {
    InterfaceId,
    Dev_Type,
    Version,
    Reference,
    Estimate_Mandays,
    Target_Start,
    Target_End,
    Actual_Start,
    Actual_End,
    Approved_Mandays,
    Date_Approve,
    Actual_Mandays,
    Root_Cause,
    Issue,
    Solution,
    Category,
    Defect_Num,
    Deployment_Date,
    Comments,
    Created_Date,
    UserId,
  } = req.body.param;
  const queryString = `CALL sp_insert_task(?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  console.log(queryString);
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(400).json({ message: "Network Error" });
      return;
    }
    try {
      connection.query(
        queryString,
        [
          InterfaceId,
          Dev_Type,
          Version,
          Reference,
          Estimate_Mandays,
          Target_Start,
          Target_End,
          Actual_Start,
          Actual_End,
          Approved_Mandays,
          Date_Approve,
          Actual_Mandays,
          Root_Cause,
          Issue,
          Solution,
          Category,
          Defect_Num,
          Deployment_Date,
          Comments,
          Created_Date,
          UserId,
        ],
        (error, results) => {
          if (error) {
            console.log(error);
            res.sendStatus(500).json({ message: "Failed to query" });
            res.end();
          } else {
            res.json(results[0]);
            connection.destroy();
          }
        }
      );
    } catch (error) {
      res.status(400).json({ message: "Network Error" });
      res.end();
    }
    connection.release();
  });
});

module.exports = {
  getSVNInformation,
  searchInterface,
  insertInterface,
  updateInterface,
  deleteInterface,
  insertTask,
  deleteMultipleInterface
};
