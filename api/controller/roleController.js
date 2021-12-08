const express = require('express');
const router = express.Router();
const cors = require('cors');
const mysql = require('mysql');
const conf = require('config');

const auth = require('../../middleware/auth');
const pool = mysql.createPool(conf.CISD);

const app = express();

app.use(cors());

app.options('*', cors());

router.get('/roleaction', (req, res) => {
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
          res.json(results);
          connection.destroy();
        }
      });
    } catch (error) {
      res.status(400).json({ msg: 'ROLEACTION-4: Network Error' });
    }
  });
});

router.get('/search', auth, (req, res) => {
  const queryString = `SELECT role_id, Title, IsActive, created_date, change_date FROM tbm_role`;
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('ROLESEARCHGET: Network Error');
    }
    try {
      connection.query(queryString, (error, results, fields) => {
        if (error) {
          res.sendStatus(500).json({ msg: 'ROLESEARCHGET-3: Failed to query' });
          res.end();
        } else {
          res.json(results);
          connection.destroy();
        }
      });
    } catch (error) {
      res.status(400).json({ msg: 'ROLESEARCHGET-2: Network Error' });
    }
  });
});

router.get('/', auth, (req, res) => {
  const queryString = `SELECT r.role_id AS RoleId, r.Title AS RoleTitle, (r.IsActive + 0) AS RoleIsActive, a.action_id AS ActionId, a.Title AS ActionTitle, a.sys_id AS SystemId
  FROM tbm_roleaction ra
  RIGHT JOIN tbm_role r ON ra.role_id = r.role_id
  LEFT JOIN tbm_action a ON ra.action_id = a.action_id`;

  pool.getConnection((err, connection) => {
    if (err) {
      console.log('ROLESEARCH: Network Error');
    }
    try {
      connection.query(queryString, (error, results, fields) => {
        if (error) {
          console.log('ROLESEARCH-1: Failed to query');
          res.sendStatus(500).json({ msg: 'COQE1B: Failed to query' });
          res.end();
        } else {
          res.json(results);
          connection.destroy();
        }
      });
    } catch (error) {
      res.status(400).json({ msg: 'ROLESEARCH-2: Network Error' });
    }
  });
});

router.get('/actions', auth, (req, res) => {
    const queryString = `SELECT action_id, Title, sys_id, IsActive, created_on, change_on FROM tbm_action`;
  
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
  router.post('/', auth, (req, res) => {
    const {title, isActive} = req.body;
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
  router.delete('/:id', auth, (req, res) => {
    const {id} = req.params;
    const queryString = `call sp_delete_role(${id})`;
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
  router.put('/', auth, (req, res) => {
    const {roleId, actionIds, isActive} = req.body;
    const queryString = `call sp_insert_user_access('${roleId}','${actionIds}',${isActive},'${req.user.id}')`;
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
module.exports = router;
