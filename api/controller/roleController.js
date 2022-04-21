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

const searchRole = asyncHander(async (req, res) => {
    const queryString = `SELECT Id, Name, Description, IsActive, InsertedOn, UpdatedOn FROM roles`;
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
                    res.json(results);
                    connection.destroy();
                }
            });
        } catch (error) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            res.end();
        }
        connection.release();
    });
});
module.exports = { searchRole };
