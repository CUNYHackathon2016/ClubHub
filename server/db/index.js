'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var University = require('./models/uni');
var Club = require('./models/club');
var Event = require('./models/event');
var Class = require('./models/class');
var Announce = require('./models/anmt');
var Tag = require('./models/tag');

University.hasMany(Club);
Club.belongsTo(University);
Event.belongsTo(Club);
User.belongsToMany(Club, {through: 'UserToClub'});
Club.belongsToMany(User, {through: 'UserToClub'});
Event.belongsToMany(User, {through: "UserToEvent"});
Announce.belongsTo(Club);
Tag.belongsToMany(Club, {through: 'TagToClub'});

Class.belongsToMany(User, {through: 'UserToClass'});
User.belongsToMany(Class, {through: 'UserToClass'});
Class.belongsTo(University);