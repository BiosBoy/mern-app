'use strict'
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();
const router = express.Router();

const EmployersSchemaDB = require('./SchemaDB/EmployersSchemaDB');
const User = require('./SchemaDB/ShemaAuthtificaion');

mongoose.connect('mongodb://testtest:period312@ds113799.mlab.com:13799/test_db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

router.get('/', (req, res) => {
    res.json('Hello on the Homepage!');
});

router
    .get('/auth/login', (req, res) => {
        User.find((err, users) => {
            if (err) { res.send(err) }
            if (req.session.userId !== undefined) {
                console.log('User with cookies come back on login page!');
                res.json(req.session.userId);
            } else {
                console.log('New User entered login page!');
                res.json('');
            }
        });
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

router.get('/auth/logout', function(req, res, next) {
    if (req.session.userId != undefined) {
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                console.log('User with cookies had been logouted');
                res.json('User is logouted');
            }
        });
    } else {
        res.json('There is no one is logined now!');
    }
});

router
    .get('/auth/registration', function(req, res, next) {
        User.find((err, users) => {
            if (err) { res.send(err) }
            if (req.session.userId !== undefined) {
                console.log('User with cookies on the registration page!');
                res.json(req.session.userId);
            } else {
                console.log('New user on the registration page!');
                res.json({message: 'You are on the registration page!'});
            }
        });
    })
    .post('/auth/registration', function(req, res, next) {
        User.findOne({ email: req.body.email }, function(err, result) {
            if (err) { res.send(err) }
            if (result !== null) {
                if (result.email === req.body.email) {
                    console.log('The users with this email already exist');
                    res.json('The users with this email already exist!');
                }
            } else {
                if (req.body.password !== req.body.passwordConf) {
                    var err = new Error('Passwords do not match.');
                    err.status = 400;
                    console.log('Passwords do not match.');
                    res.send("passwords dont match");
                    return next(err);
                }
        
                if (req.body.email &&
                    req.body.username &&
                    req.body.password &&
                    req.body.passwordConf) {
                    
                        let user = new User();
        
                        user.email = req.body.email;
                        user.username = req.body.username;
                        user.password = req.body.password;
                        user.passwordConf = req.body.passwordConf;
                        
                        user.save((err) => {
                            if (err) { res.send(err) }

                            console.log('---===--- \n New User successfully added!' + user.username + '\n ---===---');    
                            res.json({message: 'New User successfully added!'});
                        });  
                } else {
                    console.log('Not the all fields are filled!');    
                    var err = new Error('All fields required.');
                    err.status = 400;
                    return next(err);
                }
            }
        })
    });


router.route('/profile')
    .get((req, res, next) => {
        User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
            return next(error);
            } else {
            return res.json({ id: user._id, email: user.email });
            }
        });
    });

router.route('/employers')
    .get((req, res) => {
        async function getData(callback) {
            const sess = await function coock() {
                if (req.session.userId !== undefined) {
                    return req.session.userId;
                } 
                else {
                    return "";
                }
            } 

            const arr = await EmployersSchemaDB.find((err, employers) => {
                return employers;
            });

            return {
                sess: sess(),
                arr
            }
        }

        getData().then(res => {
            callback(res) }
        );

        function callback(arr) {
            res.json(arr);
        }

        getData();
    })
    .post((req, res) => {
        let employer = new EmployersSchemaDB();

        employer.first_name = req.body.first_name;
        employer.last_name = req.body.last_name;
        employer.birth_date = req.body.birth_date;
        employer.salary = req.body.salary;

        employer.save((err) => {
            if (err) { res.send(err) }
            console.log('---===--- \n New employer added: ' + employer.first_name + '\n ---===---');
            res.json({ message: 'New employer added!', employer: employer.first_name });
        });  
    });

router.route('/employers/:employer_id')
    .get((req, res) => {
        EmployersSchemaDB.findById(req.params.employer_id, (err, employer) => {
            if (err) { res.send(err) }

            res.json({ message: 'Employer page', employer: employer });
        });
    })
    .put((req, res) => {
        EmployersSchemaDB.findById(req.params.employer_id, (err, employer) => {
            if (err) { res.send(err) }

            (req.body.id) ? employer.id = req.body.id : null;
            (req.body.first_name) ? employer.first_name = req.body.first_name : null;
            (req.body.last_name) ? employer.last_name = req.body.last_name : null;
            (req.body.birth_date) ? employer.birth_date = req.body.birth_date : null;
            (req.body.salary) ? employer.salary = req.body.salary : null;

            employer.save((err) => {
                if (err) { res.send(err) }

                res.json({ message: 'Employer has been updated', employer: employer  });
            });
        });
    })
    .delete((req, res) => {
        EmployersSchemaDB.remove({ _id: req.params.employer_id }, (err, employer) => {
            if (err) { res.send(err) }

            res.json({ message: 'Comment has been deleted' })
        })
    });

app.use('/', router);

const port = process.env.API_PORT || 3016;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});