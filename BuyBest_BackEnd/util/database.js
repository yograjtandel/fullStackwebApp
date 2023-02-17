const Sequelize = require('sequelize');

const sequelize = new Sequelize("MF", "root", "root", {
  dialect: 'mysql',
  host: 'localhost'
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected to DB");
  })
  .catch(() => {
    console.log("database connection error");
  });

module.exports = sequelize;
