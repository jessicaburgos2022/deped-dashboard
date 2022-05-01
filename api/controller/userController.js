const generateToken = require("../utils/generateToken");
const asyncHander = require("express-async-handler");
const _ = require("lodash");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
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

const userController = asyncHander(async (req, res) => {
  const origin =
    req.headers && req.headers.origin
      ? req.headers.origin
      : "http://localhost:3000";
  const url = new URL(origin);
  const hostname = url.hostname;
  const { username, password } = req.body;
  const ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  const queryString = `call sp_validate_login('${username}', 'sys-mis', '${ip}')`;
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("AUQE2A: Network Error");
      res.status(400).json({ message: "Network Error" });
      return;
    }
    try {
      connection.query(queryString, (error, results) => {
        if (error) {
          console.log(error);
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
              business_unit,
            } = user;
            if (Status === "Failed") {
              res.status(400).json({ message: Message });
              res.end();
            } else {
              const isMatch = bcrypt.compareSync(password, user_pwd);
              console.log(password)
              if (!isMatch) {
                res.status(400).json({ message: "Invalid Credentials" });
                res.end();
              } else {
                res
                  .status(200)
                  .cookie("token", generateToken(user_id), {
                    path: "/",
                    expires: new Date(
                      new Date().getTime() + 60 * 8 * 60 * 1000
                    ),
                    httpOnly: true,
                  })
                  .cookie("business_unit", business_unit, {
                    path: "/",
                    expires: new Date(
                      new Date().getTime() + 60 * 8 * 60 * 1000
                    ),
                  })
                  .json({
                    server: servers[hostname],
                    user_id,
                    user_grp_id,
                    business_unit,
                  });
              }
            }
          } else {
            res.status(401).json({ message: "Invalid Credentials" });
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

const loadUser = asyncHander(async (req, res) => {
  const origin =
    req.headers && req.headers.origin
      ? req.headers.origin
      : "http://localhost:3000";
  const url = new URL(origin);
  const hostname = url.hostname;
  const ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  const queryString = `SELECT user.user_id, user.user_name, user.user_pwd, user.expiry_date, user.user_grp_id, user.isactive, user.sys_id, user.isAdmin, grp.business_unit FROM tbm_user user
  LEFT JOIN tbm_usergroup grp ON grp.user_grp_id = USER.user_grp_id AND grp.sys_id = user.sys_id
  WHERE user_id='${req.user}' and user.sys_id='sys-serviceui'
  `;

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
          if (!_.isEmpty(results)) {
            const user = _.mapValues(JSON.parse(JSON.stringify(results)))[0];
            const exipry = moment(user.expiry_date).format("YYYY-MM-DD");
            const current = moment().format("YYYY-MM-DD");
            const remaining = moment(exipry).diff(moment(current), "days");
            if (_.toLower(user.isactive) === "y") {
              const user_id = user.user_id;
              const business_unit = user.business_unit;
              const user_grp_id = user.user_grp_id;
              const isAdmin = user.isAdmin;

              if (remaining < 0) {
                res.status(400).json({ message: "Account Expired" });
              } else {
                res
                  .status(200)
                  .cookie("token", generateToken(user_id), {
                    sameSite: "lax",
                    path: "/",
                    expires: new Date(
                      new Date().getTime() + 60 * 8 * 60 * 1000
                    ),
                    httpOnly: true,
                  })
                  .cookie("business_unit", business_unit, {
                    sameSite: "lax",
                    path: "/",
                    expires: new Date(
                      new Date().getTime() + 60 * 8 * 60 * 1000
                    ),
                  })
                  .json({
                    server: servers[hostname],
                    isAdmin,
                    user_id,
                    user_grp_id,
                    business_unit,
                  });

                const queryStringLog = `INSERT INTO tblp_loguser SET sys_id='sys-serviceui', user_grp_id='${user_grp_id}', user_id='${user_id}',
                        ip_address='${ip}', status='in', created_date = now();`;
                try {
                  connection.query(queryStringLog, (error, results) => {
                    if (error) {
                      res.sendStatus(500).json({ message: "Server Error" });
                      res.end();
                    }
                  });
                } catch (error) {
                  res.status(400).json({ message: "Inactive User" });
                  res.end();
                }
              }
            } else {
              res.status(401).json({ message: "Inactive User" });
              res.end();
            }
          } else {
            res.status(401).json({ message: "Invalid Credentials" });
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

const searchUserAccounts = asyncHander(async (req, res) => {
  const queryString = `CALL SearchUserAccounts()`;
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


const changePassword = asyncHander(async (req, res) => {
  const { username, currentpassword, newpassword } = req.body;
  console.log(req.body)
  const queryString = `SELECT Id, Username, Password FROM accounts WHERE Username='${username}';`;
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({ result: 'Failed', message: "An error occurred while processing your request, Please contact your system administrator" });
    }
    connection.query(queryString, (error, results) => {
      if (error) {
        res.json({ result: 'Failed', message: "An error occurred while processing your request, Please contact your system administrator" });
        res.end();
      } else {
        if (!_.isEmpty(results)) {
          const user = _.mapValues(JSON.parse(JSON.stringify(results)))[0];
          const { Id, Username, Password, IsActive } = user;
          console.log(user)
          const isMatch = bcrypt.compareSync(currentpassword, Password);
          if (!isMatch) {
            res.status(200).json({ result: 'Failed', message: "Invalid Password" });
          } else {
            const saltRounds = 10;
            const hashPassword = bcrypt.hashSync(newpassword, saltRounds);

            const queryStringUP = `UPDATE accounts SET Password='${hashPassword}' WHERE Id='${Id}'`;

            pool.getConnection((err, connection) => {
              if (err) {
                res.json({ result: 'Failed', message: "An error occurred while processing your request, Please contact your system administrator" });
              }
              connection.query(queryStringUP, (error, results, fields) => {
                if (error) {
                  res.json({ result: 'Failed', message: "An error occurred while processing your request, Please contact your system administrator" });
                  res.end();
                } else {
                  res.json({ result: 'Success', message: "Password successfully changed" });
                  connection.release();
                }
              });
            });
          }
        }
        connection.release();
      }
    });
  });
});


module.exports = { userController, loadUser, searchUserAccounts, changePassword };
