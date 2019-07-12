const Sequelize = require('sequelize');

const sequelize = new Sequelize('query_practice', 'maks', '123', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;