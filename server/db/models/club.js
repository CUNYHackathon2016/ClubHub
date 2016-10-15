var Sequelize = require('sequelize');
var db = require('../_db');

module.exports = db.define('club', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    desc: {
        type: Sequelize.TEXT
    },
    type: {
        type: Sequelize.ENUM('Art', 'Engineering', 'Entertainment', 'Politics', "Social", "Cultural", "Other")
    }
});