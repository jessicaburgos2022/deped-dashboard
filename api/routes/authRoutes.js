const express = require('express');
const router = express.Router();

const { auth,validate, loadUser, register } = require('../controller/authController');
const { protect } = require('../middleware/authMiddleware');

router.route('/account').post(auth);
router.route('/register').post(register)

module.exports = router;
