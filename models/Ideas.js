const Sequelize = require('sequelize');
const sequelize = require('lib/database')

const Ideas = sequelize.define('ideas', {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING
  },
  author: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  tableName: 'ideas',
  timestamps: false
});

module.exports = Ideas;