const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const { DataTypes } = Sequelize;

const AMC = sequelize.define("AMC", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = AMC;
