;(function() {

  'use strict';

  /**
   * User model helpers
   */

  var bcrypt = require('bcryptjs');
  var SALT_WORK_FACTOR = 10;

  // public
  module.exports = {
    hashPassword,
    setTimestamps,
    comparePassword
  };

  /// definitions

  /**
   * Hash password sent in body params
   */
  function hashPassword(user, next) {
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) return next(err);

      // hash the password along with our new salt
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;

        next();
      });
    });
  }

  /**
   * Set timestamps - createdAt, updatedAt
   */
  function setTimestamps(user, next) {
    // get the current date
    var currentDate = new Date();

    // change the updatedAt field to current date
    if (user.createdAt)
      user.updatedAt = currentDate;

    // if createdAt doesn't exist, add this field
    if (!user.createdAt)
      user.createdAt = currentDate;

    next();
  }

  /**
   * Compare hashed password with pass sent in body params
   */
  function comparePassword(passToTest, cb) {
    bcrypt.compare(passToTest, this.password, (err, isMatch) => {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  };

})();
