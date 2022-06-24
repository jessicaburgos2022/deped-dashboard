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

const listOutcomeType = asyncHander(async (req, res) => {
    const queryString = `CALL ListOutcomeType()`;
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

const listIndicatorsByOutcomeId = asyncHander(async (req, res) => {
    const { outcomeid } = req.params;
    const queryString = `CALL ListIndicatorsByOutcomeId(${mysql_real_escape_string(outcomeid)})`;
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
const searchOutcome = asyncHander(async (req, res) => {
    const { outcomeyear, departmentid, outcometypeid, title } = req.body;
    const queryString = `CALL SearchOutcome(${mysql_real_escape_string(outcomeyear)},${mysql_real_escape_string(departmentid)}, ${mysql_real_escape_string(outcometypeid)}, '${mysql_real_escape_string(title)}')`;
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

const insertOutcome = asyncHander(async (req, res) => {
    const { departmentid, outcometypeid, quarter, title } = req.body;
    const queryString = `CALL InsertOutcome( ${mysql_real_escape_string(outcometypeid)}, ${mysql_real_escape_string(departmentid)}, ${mysql_real_escape_string(quarter)}, '${mysql_real_escape_string(title)}')`;
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

const insertIndicator = asyncHander(async (req, res) => {
    const { outcomeid, indicator, iscomputed } = req.body;
    const queryString = `CALL InsertIndicator(${mysql_real_escape_string(outcomeid)},'${mysql_real_escape_string(indicator)}',${iscomputed})`;
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

const editIndicator = asyncHander(async (req, res) => {
    const { indicatorid, indicator } = req.body;
    const queryString = `UPDATE indicator SET indicator = '${mysql_real_escape_string(indicator)}' WHERE Id = ${mysql_real_escape_string(indicatorid)}`;
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
                    res.json({ result: 'Success', message: 'Indicator updated.' });
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

const deleteIndicator = asyncHander(async (req, res) => {
    const { indicatorid } = req.params;
    const queryString = `DELETE FROM indicator WHERE Id = ${mysql_real_escape_string(indicatorid)}`;
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
                    res.json({ result: 'Success', message: 'Indicator deleted.' });
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

const updateIsGraphDataByIndicatorId = asyncHander(async (req, res) => {
    const { indicatorid, status } = req.body;
    const queryString = `UPDATE indicator SET IsComputed = ${status} WHERE Id = ${indicatorid}`;
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
                    res.json({ result: 'Success', message: 'Data updated' });
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

module.exports = { listOutcomeType, searchOutcome, insertOutcome, listIndicatorsByOutcomeId, insertIndicator, editIndicator, deleteIndicator, updateIsGraphDataByIndicatorId };
