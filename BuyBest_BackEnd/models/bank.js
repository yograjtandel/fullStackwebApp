const Sequelize = require("sequelize");
const sequelize = require("../util/database");


const { DataTypes } = Sequelize;

const Bank = sequelize.define("Bank",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    number: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    primary_account: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    type: {
        type: DataTypes.ENUM("SAVINGS", "CURRENT", "NRE", "NRO"),
        allowNull: false
    },
    ifsc_code: {
        type: DataTypes.STRING(11),
        allowNull: false
    }
})

module.exports = Bank;
