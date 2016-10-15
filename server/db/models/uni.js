var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('university', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});