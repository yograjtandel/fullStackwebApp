const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  console.log("token="+token)
  try {
    decodedToken = jwt.verify(token, "MySecret");
  console.log("decodedToken="+decodedToken)
} catch (err) {
    err.statusCode = 500;
  console.log("err="+err)
  throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
  console.log("error="+error)
  throw error;
  }
  console.log("req.userId="+req.userId)
  console.log("+decodedToken.userId="+decodedToken.userId)
  req.userId = +decodedToken.userId;
  next();
};
