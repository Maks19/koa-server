const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('query_practice', 'maks', '123', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;