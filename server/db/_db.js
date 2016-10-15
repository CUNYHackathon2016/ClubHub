var Sequelize = require('sequelize');

var dbURL = /*'postgres://qlxpxwvn:Unl_RKnPejWVy0PM3eXRJD5aNjeDUsNz@jumbo.db.elephantsql.com:5432/qlxpxwvn'*/ /*||*/  'postgres://localhost:5432/hackcuny'

var db = new Sequelize(dbURL, {
  logging: false
});

module.exports = db;