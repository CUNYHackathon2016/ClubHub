var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('event', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    desc: {
        type: Sequelize.TEXT
    }/*,
    date: {

    },
    time: {

    }*/
});