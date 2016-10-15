var express = require('express');
var router = new express.Router();

var db = require('../../db');
var Event = db.model('event');
var User = db.model('user');

function assertIsAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) next();
  else res.sendStatus(401);
}

function assertIsLoggedIn(req, res, next) {
  if (req.user) next();
  else res.sendStatus(401);
}

router.get('/:id', function(req, res, next){
  Event.findOne({
    where: {
      id: req.params.id
    },
    include: [User]
  })
  .then(function(event) {
    res.send(event);
  })
  .catch(next);
})

router.get('/', function(req, res, next) {
  Event.findAll()
  .then(function(events) {
    res.send(events)
  })
  .catch(next);
})

router.put('/:id', assertIsLoggedIn, function(req, res, next){
  Event.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function(event) {
    return Event.addUser(req.user.id)
  })
  .then(function(data) {
    console.log(data);
    res.send(data);
  })
  .catch(next)
})

router.delete('/:id', assertIsAdmin, function (req, res, next) {
  Event.destroy({
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

