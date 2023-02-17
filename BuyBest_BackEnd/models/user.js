const { DataTypes } = require("sequelize");

const sequelize = require("../util/database");

const user = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  perm_addr_is_corres_addr:{type: DataTypes.BOOLEAN, allowNull: false},
  skip_nomination:{type: DataTypes.BOOLEAN, allowNull: false},
});

module.exports = user;
