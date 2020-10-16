const jwt = require('jsonwebtoken');
const config = require('../api/config');

module.exports = (req, res, next) => {
  if(!req.headers.authorization) {
    return res.status(401).json({ you: 'shall not pass!' });
  }
  
  jwt.verify(req.headers.authorization, config.jwtSecret, (err, decoded) => {
    if(err) {
      return res.status(401).json({ you: 'shall not pass!' });
    }

    next();
  });
};

