var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('class', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstDate: {
        type: Sequelize.STRING,
        allowNull: false
    },
    secondDate: {
        type: Sequelize.STRING
    },
    startTime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endTime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type:Sequelize.STRING,
        allowNull: false,
        default: "TBA"
    }
});