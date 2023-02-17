const Sequelize = require("sequelize");
const sequelize = require("../util/database");


const { DataTypes } = Sequelize;

const Address = sequelize.define("Address",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    line1: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(35),
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country_ansi_code: {
        type: DataTypes.STRING(4),
        allowNull: false,
        defaultValue: "IN"
    },

})

module.exports = Address;
