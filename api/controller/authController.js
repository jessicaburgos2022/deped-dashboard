const generateToken = require("../utils/generateToken");
const asyncHander = require("express-async-handler");
const _ = require("lodash");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const moment = require("moment");
const servers = require("../config/server.json");

dotenv.config();

const pool = mysql.createPool({
  database: process.env.DB_CISD,
  user: process.env.DB_CISD_USER,
  password: process.env.DB_CISD_PASSWORD,
  host: process.env.DB_CISD_HOST,
  connectionLimit: process.env.DB_CISD_CONNECTION_LIMT,
  timeout: process.env.DB_CISD_TIMEOUT,
});

const validate = asyncHander(async (req, res) => {
  const { username, password } = req.body;
  const queryString = `call ValidateLogin('${username}', '${password}')`;
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ result: 'Failed', message: 'Query Failed' });
      return;
    }
    try {
      connection.query(queryString, (error, results) => {
        var qResult = JSON.parse(JSON.stringify(results));
        if (qResult[0][0].result === 'Success') {
          res.json({
            res: qResult[0][0],
            acc: qResult[1],
            role: qResult[2]
          });
        }
        else {
          res.json({
            res: qResult[0][0],
            acc: [],
            role: []
          });
        }
      })
    } catch (error) {
      res.json({ result: 'Failed', message: 'Query Failed' });
      res.end();
    }
    connection.release();
  });

});

const auth = asyncHander(async (req, res) => {
  const { username, password } = req.body;
  const queryString = `call ValidateLoginV2('${username}')`;
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("AUQE2A: Network Error");
      res.status(400).json({ message: "Network Error" });
      return;
    }
    try {
      connection.query(queryString, (error, results) => {
        if (error) {
          console.log("AUQE2B: Failed to query");
          res.sendStatus(500).json({ msg: "AUQE2B: Failed to query" });
          res.end();
        } else {
          if (!_.isEmpty(results[0])) {
            const qResult = JSON.parse(JSON.stringify(results[0][0]));
            const user = JSON.parse(JSON.stringify(results[1][0]));
            const roles = JSON.parse(JSON.stringify(results[2]));
            const {
              Id
            } = user;
            const payload = {
              user: {
                id: Id,
              },
            };

            if (qResult.result !== "Success") {
              res.status(200).json(qResult);
              res.end();
            } else {
              const isMatch = bcrypt.compareSync(password, user.Password);
              if (!isMatch) {
                res.status(200).json({ result: "Failed", message: "Incorrect password" });
                res.end();
              } else {
                jwt.sign(
                  payload,
                  process.env.JWT_SECRET,
                  { expiresIn: 60 * 60 * 8 },
                  (err, token) => {
                    // if (err) throw err;
                    if (err) console.log(err);
                    results[1][0].Password = null;
                    res.json({
                      role: roles,
                      token,
                      userid: Id,
                      acc: results[1],
                      res: qResult
                    });
                  }
                );
              }
            }
          } else {
            res.status(200).json({ status: "Failed", message: "Invalid Credentials" });
            res.end();
          }
        }
        connection.release();
      });
    } catch (error) {
      res.status(400).json({ message: "AUQE2C: Network Error" });
      res.end();
      connection.release();
    }
  });
});

const register = asyncHander(async (req, res) => {
  var ip = req.header["x-forwarded-for"] || req.connection.remoteAddress;
  if (ip.substr(0, 7) == "::ffff:") {
    ip = ip.substr(7);
  }
  const username = req.body.username;
  const password = req.body.password;
  const departmentid = req.body.departmentid;
  const roleid = req.body.roleid;
  const firstname = req.body.firstname;
  const middlename = req.body.middlename;
  const surname = req.body.surname;
  const saltRounds = 10;
  const hashPassword = bcrypt.hashSync(password, saltRounds);
  const queryString = `CALL InsertUserAccount('${username}','${hashPassword}',${departmentid},${roleid},'${firstname}','${middlename}','${surname}')`;
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("Network Error");
    }
    try {
      connection.query(queryString, (error, results) => {
        if (error) {
          res.sendStatus(500).json({ msg: "Server Error" });
          res.end();
        } else {
          var qResult = JSON.parse(JSON.stringify(results[0][0]));
          if (results[0][0].result === "Success") {
            var accId = results[1][0].accountid
            const payload = {
              user: {
                id: accId,
              },
            };
            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              { expiresIn: 60 * 60 * 8 },
              (err, token) => {
                if (err) throw err;
                qResult.token = token
                res.json(qResult);
              }
            );
          }
          res.json(qResult);
          connection.release();
        }
      });
    } catch (error) {
      res.status(400).json({ msg: "Network Error" });
    }
  });
});
module.exports = { auth, validate, register };
