const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const { DataTypes } = Sequelize;

const Funds = sequelize.define("Funds", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  subtype: { type: DataTypes.STRING, allowNull: false },
  dividend: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Funds;
