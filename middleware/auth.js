const jwt = require('jsonwebtoken');
const config = require('config')

module.exports = function(req, res, nexr){
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token recived from header
  if (!token) {
    return (res.status(400).json({
        msg: 'Authorisation denied'
      })
    )
  }

  try {
    const decode = jwt.verify(token, config.get('jwtSecret'));

    req.user = decode.user;
    nect();
  } catch (error) {
    res.status(401).json({
      msg: 'Token is not valid'
    })
  }
}