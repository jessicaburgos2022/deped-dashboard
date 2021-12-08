const jwt = require('jsonwebtoken');
const asyncHander = require('express-async-handler');

const protect = asyncHander(async (req, res, next) => {
  let token = req.headers.authorization.replace("Bearer ",'');
  if (!token || process.env.CLIENT_ID !== req.headers['x-client-id']) {
    res.status(200).json([{ Message: 'Not authorized, Please re-login', Status: 'Failed' }]);
    throw new Error('Not authorized, token expired');
  } else {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  }
});

module.exports = { protect };
