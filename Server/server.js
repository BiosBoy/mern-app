'use strict'
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://dashboard.heroku.com');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

router.get('/', (req, res) => {
    res.json('Hello on the Homepage!');
});

router
    .get('/auth/login', (req, res) => {
        res.json('Hello on the Homepage!');
    })
    .post('/auth/login', (req, res, next) => {
        if (req.body.logemail && req.body.logpassword) {
            User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
                if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                console.log('User authentification failed');
                return next(err);
              } else {
                req.session.userId = user._id;
                console.log('User authentification sucsessful. User cookies: ',  req.session.userId);
                return res.redirect('/employers');
              }
            });
        } else {
            var err = new Error('All fields required.');
            err.status = 400;
            return next(err);
        }
    });


app.use('/', router);

const port = process.env.API_PORT || 3016;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
