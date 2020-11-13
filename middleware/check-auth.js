const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  const decodedToken = jwt.verify(token, JWT_KEY);
  if (decodedToken != null) {
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } else {
    res.status(401).json({ message: 'You are not authenticated!' });
  }
};
