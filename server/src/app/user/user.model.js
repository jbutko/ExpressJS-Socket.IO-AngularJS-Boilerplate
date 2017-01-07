;(function() {

  'use strict';

  /**
   * Define user model
   */
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var bcrypt = require('bcryptjs');
  var SALT_WORK_FACTOR = 10;
  var mongoosePaginate = require('mongoose-paginate');
  var userHelpers = require('./user.helpers.js');

  /**
   * User schema definition
   */
  var userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      trim: true,
      default: ''
    },
    surname: {
      type: String,
      trim: true,
      default: ''
    },
    password: {
      type: String,
      default: '',
      required: true,
    },
    email: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: 'user',
      enum: {
        values: ['user', 'admin'],
        message: 'Only "user" or "admin" roles are allowed.'
      }
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date
    },
  });

  /**
   * On every save...
   */
  userSchema.pre('save', function(next) {
    var user = this;

    userHelpers.hashPassword(user, () => {
      userHelpers.setTimestamps(user, next);
    });
  });

  userSchema.pre('findOneAndUpdate', function(next) {
    var user = this;

    // update updateAt value
    var currentDate = new Date();
    user.update({}, { $set: { updatedAt: currentDate } });
    next();
  });


  /**
   * Schema plugins
   */
  userSchema.plugin(mongoosePaginate);

  /**
   * Schema methods
   */
  userSchema.methods.comparePassword = userHelpers.comparePassword;

  // create model
  var User = mongoose.model('User', userSchema);

  // public
  module.exports = User;


})();
