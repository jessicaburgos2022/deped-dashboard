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
    const queryString = `CALL ListIndicatorsByOutcomeId(${outcomeid})`;
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
    const { departmentid, outcometypeid, title } = req.body;
    const queryString = `CALL SearchOutcome(${departmentid}, ${outcometypeid}, '${title}')`;
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
    const { departmentid, outcometypeid, title } = req.body;
    const queryString = `CALL InsertOutcome( ${outcometypeid}, ${departmentid}, '${title}')`;
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
    const queryString = `CALL InsertIndicator(${outcomeid},'${indicator}',${iscomputed})`;
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

const deleteIndicator = asyncHander(async (req, res) => {
    const { indicatorid } = req.params;
    const queryString = `DELETE FROM indicator WHERE Id = ${indicatorid}`;
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

module.exports = { listOutcomeType, searchOutcome, insertOutcome, listIndicatorsByOutcomeId, insertIndicator, deleteIndicator, updateIsGraphDataByIndicatorId };
