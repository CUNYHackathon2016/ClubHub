var Sequelize = require('sequelize');

var dbURL = process.env.DATABASE_URL || 'postgres://localhost:5432/hackcuny'

var db = new Sequelize(dbURL, {
  logging: false
});

module.exports = db;