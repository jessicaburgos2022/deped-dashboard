const mysql = require('mysql');
const asyncHander = require('express-async-handler');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  database: process.env.DB,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  connectionLimit: process.env.DB_CONNECTION_LIMT,
  timeout: process.env.DB_TIMEOUT,
});

// @desc    Get distinct service name
// @route   GET /api/bapi/servicenames
// @access  Private
const getDistinctServiceNames = asyncHander(async (req, res) => {
  const queryString = `SELECT DISTINCT interface_id FROM tbm_e2e_interface`;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(400).json({ message: 'Network Error' });
      return;
    }
    try {
      connection.query(queryString, (error, results) => {
        if (error) {
          res.sendStatus(500).json({ message: 'Failed to query' });
          res.end();
        } else {
          res.json(results);
          connection.destroy();
        }
      });
    } catch (error) {
      res.status(400).json({ message: 'Network Error' });
      res.end();
    }
    connection.release();
  });
});

// @desc    Get Bapi info by service name
// @route   GET /api/bapi/:servicename
// @access  Private
const getBapiDetailsByServiceName = asyncHander(async (req, res) => {
  const servicename = req.params.servicename;
  const queryString = `CALL sp_get_bapi_by_interface(NULL,${servicename})`;
  console.log(queryString);
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(400).json({ message: 'Network Error' });
      return;
    }
    try {
      connection.query(queryString, (error, results) => {
        if (error) {
          res.sendStatus(500).json({ message: 'Failed to query' });
          res.end();
        } else {
          res.json(results[0]);
          connection.destroy();
        }
      });
    } catch (error) {
      res.status(400).json({ message: 'Network Error' });
      res.end();
    }
    connection.release();
  });
});

// @desc    UPDATE Bapi info
// @route   PUT /api/bapi
// @access  Private
const updateBapiInfo = asyncHander(async (req, res) => {
  const {
    id,
    businessunit_id,
    bapi_param,
    param_type,
    value,
    data_type,
    sqlite_table,
  } = req.body;

  const businessunitId = businessunit_id
    ? `businessunit_id = '${businessunit_id}'`
    : 'businessunit_id = NULL';
  const bapiParam = bapi_param
    ? `bapi_param = '${bapi_param}'`
    : 'bapi_param = NULL';
  const paramType = param_type
    ? `param_type = '${param_type}'`
    : 'param_type = NULL';
  const paramValue = value ? `value = '${value}'` : 'value = NULL';
  const dataType = data_type
    ? `data_type = '${data_type}'`
    : 'data_type = NULL';
  const sqliteTable = sqlite_table
    ? `sqlite_table = '${sqlite_table}'`
    : 'sqlite_table = NULL';
  const queryString = `UPDATE tbm_bapi_inventory SET ${businessunitId}, ${bapiParam}, ${paramType}, ${paramValue},
                        ${dataType}, ${sqliteTable} WHERE id='${id}'`;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(400).json({ message: 'Network Error' });
      return;
    }
    try {
      connection.query(queryString, (error, results) => {
        if (error) {
          res.sendStatus(500).json({ message: 'Failed to query' });
          res.end();
        } else {
          res.json(results);
          connection.destroy();
        }
      });
    } catch (error) {
      res.status(400).json({ message: 'Network Error' });
      res.end();
    }
    connection.release();
  });
});

// @desc    ADD Bapi info
// @route   PUT /api/bapi
// @access  Private
const addBapiInfo = asyncHander(async (req, res) => {
  const {
    businessunit_id,
    interface_id,
    bapi_id,
    bapi_param,
    param_type,
    value,
    data_type,
    sqlite_table,
  } = req.body;
  const businessunitId = businessunit_id
    ? `businessunit_id = '${businessunit_id}'`
    : 'businessunit_id = NULL';
  const interfaceId = interface_id
    ? `interface_id = '${interface_id}'`
    : 'interface_id = NULL';
  const bapiId = bapi_id ? `bapi_id = '${bapi_id}'` : 'bapi_id = NULL';
  const bapiParam = bapi_param
    ? `bapi_param = '${bapi_param}'`
    : 'bapi_param = NULL';
  const paramType = param_type
    ? `param_type = '${param_type}'`
    : 'param_type = NULL';
  const paramValue = value ? `value = '${value}'` : 'value = NULL';
  const dataType = data_type
    ? `data_type = '${data_type}'`
    : 'data_type = NULL';
  const sqliteTable = sqlite_table
    ? `sqlite_table = '${sqlite_table}'`
    : 'sqlite_table = NULL';
  const queryString = `INSERT INTO tbm_bapi_inventory SET ${businessunitId}, ${interfaceId}, ${bapiId}, ${bapiParam}, 
  ${paramType}, ${paramValue}, ${dataType}, ${sqliteTable}`;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(400).json({ message: 'Network Error' });
      return;
    }
    try {
      connection.query(queryString, (error, results) => {
        if (error) {
          res.sendStatus(500).json({ message: 'Failed to query' });
          res.end();
        } else {
          res.json(results);
          connection.destroy();
        }
      });
    } catch (error) {
      res.status(400).json({ message: 'Network Error' });
      res.end();
    }
    connection.release();
  });
});

// @desc    Delete Bapi Record
// @route   DELETE /api/bapis/:id
// @access  Private
const deleteBapiRecord = asyncHander(async (req, res) => {
  const id = req.params.id;

  const queryString = `delete from tbm_bapi_inventory where id = '${id}'`;
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('DBQE6A: Network Error');
    }
    try {
      connection.query(queryString, (error, results, fields) => {
        if (err) {
          console.log('DBQE6B: Failed to query');
          res.sendStatus(500).json({ msg: 'DBQE6B: Failed to query' });
          res.end();
          connection.destroy();
        } else {
          res.json(results);
          connection.destroy();
        }
      });
    } catch (error) {
      res.status(400).json({ msg: 'DBQE6B: Network Error' });
    }
  });
});

// @desc    Get Active BU List
// @route   GET /api/bapis/bus
// @access  Private

const getActiveBUS = asyncHander(async (req, res) => {
  const queryString = `CALL sp_list_business_unit(1)`;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(400).json({ message: 'Network Error' });
      return;
    }
    try {
      connection.query(queryString, (error, results) => {
        if (error) {
          res.sendStatus(500).json({ message: 'Failed to query' });
          res.end();
        } else {
          res.json(results[0]);
          connection.destroy();
        }
      });
    } catch (error) {
      res.status(400).json({ message: 'Network Error' });
      res.end();
    }
    connection.release();
  });
});

// @desc    Get Interfaces by bu
// @route   GET /api/bapis/bus/:id
// @access  Private

const getInterfacesByBU = asyncHander(async (req, res) => {
  const id = req.params.id;
  const queryString = `CALL sp_search_interface('${id}', '', '', '')`;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(400).json({ message: 'Network Error' });
      return;
    }
    try {
      connection.query(queryString, (error, results) => {
        if (error) {
          res.sendStatus(500).json({ message: 'Failed to query' });
          res.end();
        } else {
          res.json(results[0]);
          connection.destroy();
        }
      });
    } catch (error) {
      res.status(400).json({ message: 'Network Error' });
      res.end();
    }
    connection.release();
  });
});

module.exports = {
  getDistinctServiceNames,
  getBapiDetailsByServiceName,
  updateBapiInfo,
  deleteBapiRecord,
  addBapiInfo,
  getActiveBUS,
  getInterfacesByBU,
};
