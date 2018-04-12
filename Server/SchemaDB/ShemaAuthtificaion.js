const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
        email: {
          type: String,
          unique: true,
          required: true,
          trim: true
        },
        username: {
          type: String,
          unique: true,
          required: true,
          trim: true
        },
        password: {
          type: String,
          required: true,
        },
        passwordConf: {
          type: String,
          required: true,
        }
    },
    { 
      collection: 'users'
    });

    UserSchema.statics.authenticate = function (email, password, callback) {
      User.findOne({ email: email })
        .exec(function (err, user) {
          console.log('user', user);
          if (err) {
            return callback(err)
          } else if (!user) {
            var err = new Error('User not found.');
            err.status = 401;
            return callback(err);
          }
          bcrypt.compare(password, user.password, function (err, result) {
            if (result === true) {
              return callback(null, user);
            } else {
              return callback();
            }
          })
        });
    }   

    UserSchema.pre('save', function (next) {
      console.log(this);
      let user = this;
      let salt = bcrypt.genSaltSync(10);
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          return console.log(err);
        }
        console.log(user);
        user.password = hash;
        next();
      })
    });

var User = mongoose.model('User', UserSchema);

module.exports = User;
