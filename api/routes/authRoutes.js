const express = require('express');
const router = express.Router();

const { auth,validate, loadUser } = require('../controller/authController');
const { protect } = require('../middleware/authMiddleware');

router.route('/account').post(validate);

module.exports = router;
