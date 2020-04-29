const jwt = require('jsonwebtoken');
const config = require('config')

function auth(req, res, next) {
  try {
    console.log('JWT ROUTES', req.header('authToken'))
    const token = req.header('authToken');
    if (!token) return res.status(401).send('Access Denied');
    const verified = jwt.verify(token, config.get('jwtSecret'));
    req.user = verified;
    console.log('req', verified)
    next();
  }
  catch (err) {
    res.status(400).send('Invalid Token')
  }

}

module.exports = auth;