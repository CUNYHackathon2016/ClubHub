var Sequelize = require('sequelize');

var dbURL = process.env.DATABASE_URL || 'postgres://qlxpxwvn:Unl_RKnPejWVy0PM3eXRJD5aNjeDUsNz@jumbo.db.elephantsql.com:5432/qlxpxwvn'

var db = new Sequelize(dbURL, {
  logging: false
});

module.exports = db;