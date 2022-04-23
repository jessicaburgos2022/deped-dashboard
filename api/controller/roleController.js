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
    const queryString = `SELECT Id, Name, Description, CASE WHEN IsActive THEN 1 ELSE 0 END AS RoleIsActive, InsertedOn, UpdatedOn FROM roles`;
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

const insertRole = asyncHander(async (req, res) => {
    const { title, isActive } = req.body;
    const queryString = `call sp_insert_role('${title}',${isActive})`;
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('ROLEINSERT: Network Error');
        }
        try {
            connection.query(queryString, (error, results, fields) => {
                if (error) {
                    console.log('ROLEINSERT-1: Failed to query');
                    res.sendStatus(500).json({ msg: 'ROLEINSERT-3: Failed to query' });
                    res.end();
                } else {
                    res.json(results[0]);
                    connection.destroy();
                }
            });
        } catch (error) {
            res.status(400).json({ msg: 'ROLEINSERT-2: Network Error' });
        }
    });
});

const deleteRole = asyncHander(async (req, res) => {
    const { id } = req.params;
    const queryString = `call sp_delete_role(${id})`;
    console.log(queryString)
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('ROLEDELETE: Network Error');
        }
        try {
            connection.query(queryString, (error, results, fields) => {
                if (error) {
                    console.log('ROLEDELETE-1: Failed to query');
                    res.sendStatus(500).json({ msg: 'ROLEDELETE-3: Failed to query' });
                    res.end();
                } else {
                    res.json(results[0]);
                    connection.destroy();
                }
            });
        } catch (error) {
            res.status(400).json({ msg: 'ROLEDELETE-2: Network Error' });
        }
    });
});

const getActions = asyncHander(async (req, res) => {
    const queryString = `SELECT Id AS action_id, Name AS Title, Description, CASE WHEN IsActive THEN 1 ELSE 0 END AS IsActive, InsertedOn, UpdatedOn FROM ref_actions`;
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('ACTIONGET: Network Error');
        }
        try {
            connection.query(queryString, (error, results, fields) => {
                if (error) {
                    console.log('ACTIONGET-1: Failed to query');
                    res.sendStatus(500).json({ msg: 'COQE1B: Failed to query' });
                    res.end();
                } else {
                    res.json(results);
                    connection.destroy();
                }
            });
        } catch (error) {
            res.status(400).json({ msg: 'ACTIONGET-2: Network Error' });
        }
    });
});

const insertUserAccess = asyncHander(async (req, res) => {
    const { roleId, actionIds, isActive } = req.body;
    const queryString = `call sp_insert_user_access('${roleId}','${actionIds}',${isActive},'0')`;
    console.log(queryString)
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('ACTIONGET: Network Error');
        }
        try {
            connection.query(queryString, (error, results, fields) => {
                if (error) {
                    console.log('ACTIONGET-1: Failed to query');
                    res.sendStatus(500).json({ msg: 'COQE1B: Failed to query' });
                    res.end();
                } else {
                    res.json(results[0]);
                    connection.destroy();
                }
            });
        } catch (error) {
            res.status(400).json({ msg: 'ACTIONGET-2: Network Error' });
        }
    });
});

const getRoleActions = asyncHander(async (req, res) => {
    const queryString = `CALL sp_search_user_role()`;
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('ROLEACTION-1: Network Error');
        }
        try {
            connection.query(queryString, (error, results, fields) => {
                if (error) {
                    res.sendStatus(500).json({ msg: 'ROLEACTION-3: Failed to query' });
                    res.end();
                } else {
                    res.json(results[0]);
                    connection.destroy();
                }
            });
        } catch (error) {
            res.status(400).json({ msg: 'ROLEACTION-4: Network Error' });
        }
    });
});

module.exports = { searchRole, insertRole, deleteRole, insertUserAccess, getActions, getRoleActions };
