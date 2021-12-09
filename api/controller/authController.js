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
        if (qResult[0][0].Result === 'Success') {
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
  const queryString = `call ValidateLogin('${username}', '${password}')`;
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
            const user = _.mapValues(JSON.parse(JSON.stringify(results[0])))[0];
            const {
              Status,
              Message,
              user_id,
              user_pwd,
              user_grp_id,
              business_unit
            } = user;

            const payload = {
              user: {
                id: user_id,
                user_grp_id: user_grp_id,
              },
            };

            if (Status === "Failed") {
              res.status(200).json({ status: Status, message: Message });
              res.end();
            } else {
              const isMatch = bcrypt.compareSync(password, user_pwd);
              if (!isMatch) {
                res.status(200).json({ status: "Failed", message: "Incorrect password" });
                res.end();
              } else {
                jwt.sign(
                  payload,
                  'secret',
                  { expiresIn: 60 * 60 * 8 },
                  (err, token) => {
                    // if (err) throw err;
                    if (err) console.log(err);
                    res.json({
                      server: servers[hostname],
                      user_id,
                      details: results[1][0],
                      role: results[2],
                      user_grp_id,
                      business_unit,
                      token
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

module.exports = { auth, validate };
