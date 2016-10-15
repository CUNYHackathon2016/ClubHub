var express = require('express');
var router = new express.Router();
var Promise = require('sequelize').Promise;

var db = require('../../db');
var User = db.model('user');
var Class = db.model('class');

function assertIsAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) next();
  else res.sendStatus(401);
}

function assertIsLoggedIn(req, res, next) {
  if (req.user) next();
  else res.sendStatus(401);
}

/*function createClasses(classes) {
  var creatingClasses = classes.map(function (course) {
        return Class.findOrCreate(course);
    });

  return Promise.all(creatingClasses);
}*/

router.get('/:id/classes', function (req, res, next) {
  User.findById(req.params.id)
  .then(function(user) {
    // if (req.user != req.params.id) next()
    return user.getClasses()
  })
  .then(function (classes) {
    res.send(classes);
  })
  .catch(next);
})

router.post('/class', assertIsLoggedIn, function (req, res, next) {
  var classId;
  Class.findOrCreate({
    where: req.body
  })
  .then(function (classObj) {
    classId = classObj[0].id;
    return User.findById(req.user.id)
  })
  .then(function(user) {
    return user.addClass(classId);
  })
  .then(function () {
    res.sendStatus(201)
  })
  .catch(next);
})

router.get('/:id', function(req, res, next){
  User.findById(req.params.id)
  .then(function(user) {
    req.session.userId = user.id;
    res.send(user)
  })
  .catch(next);
})

router.get('/', assertIsAdmin, function(req, res, next) {
  User.findAll()
  .then(function(users) {
    res.send(users)
  })
  .catch(next);
})

router.post('/', function(req, res, next){
  User.create(req.body)
  .then(function(user) {
    res.sendStatus(200);
  })
  .catch(next)
})

router.delete('/:id', assertIsAdmin, function (req, res, next) {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(function() {
    res.sendStatus(204);
  })
  .catch(next);
})

module.exports = router;

