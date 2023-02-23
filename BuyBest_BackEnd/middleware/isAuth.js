const jwt = require("jsonwebtoken");

const authConfig = require("../config/authConfig");
const RefreshToken = require("../models/refreshToken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  const access = authHeader.split(" ")[1];
  const refhresh = authHeader.split(" ")[2];

  let decodedToken;
  try {
    decodedToken = jwt.verify(access, authConfig.secret);
  } catch (err) {
    err.statusCode = 500;
    console.log("err=" + err);
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  RefreshToken.verifyExpiration(+decodedToken.userId).then((valid) => {
    if (!valid) {
      RefreshToken.findOne({ where: { token: refhresh } }).then((doc) => {
        RefreshToken.destroy({ where: { id: doc.id } });
        res.status(403).json({
          message:
            "Refresh token was expired. Please make a new signin request",
        });
      });
    }
  });
  req.userId = +decodedToken.userId;
  next();
};
