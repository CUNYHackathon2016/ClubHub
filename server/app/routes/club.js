var express = require('express');
var router = new express.Router();

var db = require('../../db');
var Club = db.model('club');
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
  Club.findOne({
    where: {
      id: req.params.id
    },
    include: [User]
  })
  .then(function(club) {
    res.send(club);
  })
  .catch(next);
})

router.get('/', function(req, res, next) {
  Club.findAll()
  .then(function(clubs) {
    res.send(clubs)
  })
  .catch(next);
})

router.put('/:id', assertIsLoggedIn, function(req, res, next){
  Club.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function(club) {
    return club.addUser(req.user.id)
  })
  .then(function(data) {
    console.log(data);
    res.send(data);
  })
  .catch(next)
})

router.delete('/:id', assertIsAdmin, function (req, res, next) {
  Club.destroy({
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

