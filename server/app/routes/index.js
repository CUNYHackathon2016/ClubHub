'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/user', require('./user'));
router.use('/club', require('./club'));
router.use('/uni', require('./university'));
router.use('/event', require('./event'));

router.use(function (req, res) {
    res.status(404).end();
});
