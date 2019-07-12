const Sequelize = require('sequelize');
const sequelize = require('lib/database');

const Users = sequelize.define('users', {
  name: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  tableName: 'users',
  timestamps: false
});
module.exports = Users;