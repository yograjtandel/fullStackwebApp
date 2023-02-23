const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const { DataTypes } = Sequelize;

const Auth = sequelize.define("auth",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isd_code: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Auth;
