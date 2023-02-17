const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const { DataTypes } = Sequelize;

const Nominee = sequelize.define("Nominee", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(35),
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  relationship: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  allocation_percentage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Nominee;
