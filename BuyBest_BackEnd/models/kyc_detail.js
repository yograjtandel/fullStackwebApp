const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const { DataTypes } = Sequelize;

const KYCDetail = sequelize.define("KYCDetail", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(70),
    allowNull: false,
  },
  pan_number: { type: DataTypes.STRING(20), allowNull: false },
  country_of_citizenship_ansi_code: {
    type: DataTypes.STRING(4),
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM("MALE", "FEMALE", "OTHERS"),
    allowNull: false,
  },
  marital_status: {
    type: DataTypes.ENUM("MARRIED", "SINGLE", "OTHERS"),
    allowNull: false,
  },
  residential_status: {
    type: DataTypes.ENUM("RESIDENT_INDIVIDUAL", "NON_RESIDENT_INDIVIDUAL"),
    allowNull: false,
  },
  occupation: {
    type: DataTypes.ENUM(
      "AGRICULTURE",
      "BUSINESS",
      "DOCTOR",
      "FOREX_DEALER",
      "GOVERNMENT_SERVICE",
      "HOUSE_WIFE",
      "OTHERS",
      "PRIVATE_SECTOR_SERVICE",
      "PROFESSIONAL",
      "PUBLIC_SECTOR_SERVICE",
      "RETIRED",
      "SERVICE",
      "STUDENT"
    ),
    allowNull: false,
  },
  pep_exposed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  pep_related: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = KYCDetail;
