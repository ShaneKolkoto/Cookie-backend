const jwt = require('jsonwebtoken');
const config = require('config')

async function VerifyUser (req, res, id) {
  const token = req.header('x-auth-token')
  jwt.verify(token, config.get("jwtSecret")
  , (error, decodedToken) => {
  if (error) {
    res.status(401).json({
      msg: 'Unauthorized Access!',
    });
  } else {
    res.status(200);
    res.send(decodedToken)
  }
});
}
module.exports = {
  VerifyUser
};