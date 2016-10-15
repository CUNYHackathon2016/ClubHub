var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('announcement', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    desc: {
        type: Sequelize.TEXT,
        allowNull:false
    }
});