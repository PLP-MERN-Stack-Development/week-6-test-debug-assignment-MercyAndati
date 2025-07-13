const jwt = require('jsonwebtoken');

exports.generateToken = user => {
  return jwt.sign({ id: user._id }, 'secret', { expiresIn: '1d' });
};
