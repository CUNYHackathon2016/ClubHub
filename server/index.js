'use strict';
var path = require('path');
var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var LocalStrategy = require('passport-local').Strategy;


var db = require('./db');
var User = db.model('user');

module.exports = function () {

    app.use(express.static(path.join(__dirname, '../node_modules')));
    app.use(express.static(path.join(__dirname, '../browser')));

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));






    var dbStore = new SequelizeStore({
        db: db
    });

    dbStore.sync();

    app.use(session({
        secret: process.env.SESSION_SECRET || 'cool secr3t',
        store: dbStore,
        resave: false,
        saveUninitialized: false
    }));

    // Initialize passport and also allow it to read
    // the request session information.
    app.use(passport.initialize());
    app.use(passport.session());

    // When we give a cookie to the browser, it is just the userId (encrypted with our secret).
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // When we receive a cookie from the browser, we use that id to set our req.user
    // to a user found in the database.
    passport.deserializeUser(function (id, done) {
        User.findById(id)
            .then(function (user) {
                done(null, user);
            })
            .catch(done);
    });

    // We provide a simple GET /session in order to get session information directly
    app.get('/session', function (req, res) {
        if (req.user) {
            res.send({ user: req.user.sanitize() });
        } else {
            res.status(401).send('No authenticated user.');
        }
    });


    var strategyFn = function (email, password, done) {
        User.findOne({
                where: {
                    email: email
                }
            })
            .then(function (user) {
                // user.correctPassword is a method from the User schema.
                if (!user || !user.correctPassword(password)) {
                    done(null, false);
                } else {
                    // Properly authenticated.
                    done(null, user);
                }
            })
            .catch(done);
    };

    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, strategyFn));









    app.use('/api', require('./app/routes'));

    app.post('/login', function (req, res, next) {

        var authCb = function (err, user) {
            if (err) return next(err);

            if (!user) {
                var error = new Error('Invalid login credentials.');
                error.status = 401;
                return next(error);
            }

            // req.logIn will establish our session.
            req.logIn(user, function (loginErr) {
                if (loginErr) return next(loginErr);
                // We respond with a response object that has user with _id and email.
                res.status(200).send({
                    user: user.sanitize()
                });
            });
        };
        passport.authenticate('local', authCb)(req, res, next);

    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.status(200).end();
    });





    app.get('/calendar', function (req, res) {
        res.sendFile(path.join(__dirname,'../browser/calendar.html'));
    })

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname,'../browser/test.html'));
    });





    // Error catching endware.
    app.use(function (err, req, res, next) {
        console.error(err);
        console.error(err.stack);
        res.status(err.status || 500).send(err.message || 'Internal server error.');
    });

    return app;

};

