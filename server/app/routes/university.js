var express = require('express');
var router = new express.Router();

var db = require('../../db');
var Uni = db.model('university');
var Club = db.model('club');

function assertIsAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) next();
  else res.sendStatus(401);
}

function assertIsLoggedIn(req, res, next) {
  if (req.user) next();
  else res.sendStatus(401);
}

router.get('/:id', function (req, res, next) {
  Uni.findOne({
    where: {
      id: req.params.id
    },
    include: [Club]
  })
  .then(function(uni) {
    res.send(uni)
  })
  .catch(next)
})

router.get('/', function(req, res, next) {
  Uni.findAll()
  .then(function(unis) {
    res.send(unis)
  })
  .catch(next);
})


router.delete('/:id', assertIsAdmin, function (req, res, next) {
  Uni.destroy({
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

