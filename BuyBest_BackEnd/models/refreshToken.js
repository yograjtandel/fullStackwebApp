const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const { DataTypes } = Sequelize;

const config = require("../config/authConfig");
const { v4: uuidv4 } = require("uuid");

const Auth = require("../models/auth");

const RefreshToken = sequelize.define("refreshToken", {
  token: {
    type: DataTypes.STRING,
  },
  expiryDate: {
    type: DataTypes.DATE,
  },
});

RefreshToken.createToken = async function (user) {
  return RefreshToken.findOne({ where: { authId: user.id } }).then(
    async (authDoc) => {
      let expiredAt = new Date();

      expiredAt.setSeconds(
        expiredAt.getSeconds() + config.jwtRefreshExpiration
      );

      let _token = uuidv4();
      if (authDoc) {
        const refreshDoc = await RefreshToken.update(
          {
            token: _token,
            expiryDate: expiredAt.getTime(),
          },
          { where: { id: authDoc.id } }
        );
        const token = await RefreshToken.findOne({
          where: { authId: refreshDoc[0] },
        });

        return token.token;
      } else {
        return this.create({
          token: _token,
          expiryDate: expiredAt.getTime(),
        })
          .then((refreshtoken) => {
            user.setRefreshToken(refreshtoken);
            return refreshtoken.token;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
};

RefreshToken.verifyExpiration = async (user_id) => {
  const validity = await RefreshToken.findOne({
    where: { authId: user_id },
  }).then((Doc) => {
    return Doc.expiryDate.getTime() > new Date().getTime();
  });
  return validity;
};

module.exports = RefreshToken;
