const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const { DataTypes } = Sequelize;

const FatcaDetail = sequelize.define("FatcaDetail", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  country_of_birth_ansi_code: {
    type: DataTypes.STRING(4),
    allowNull: false,
  },
  no_other_tax_residences: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  source_of_wealth: {
    type: DataTypes.ENUM(
      "SALARY",
      "BUSINESS",
      "GIFT",
      "ANCESTRAL_PROPERTY",
      "RENTAL_INCOME",
      "PRIZE_MONEY",
      "ROYALTY",
      "OTHERS"
    ),
    allowNull: false,
  },
  gross_annual_income: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = FatcaDetail;
