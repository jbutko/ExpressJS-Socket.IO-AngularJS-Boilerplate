;(function() {

  'use strict';

  /**
   * API Router
   */
  var express = require('express');
  var router = express.Router();

  // controllers
  var usersCtrl = require('./user/users.controller.js');

  /**
   * Users
   */
  router.post('/users/authenticate', usersCtrl.authenticate); // authenticate user
  router.post('/users', usersCtrl.createUser); // create new user
  router.get('/users/', usersCtrl.verifyToken, /*usersCtrl.isAdmin,*/ usersCtrl.getUsers); // get all users (uncomment usersCtrl.isAdmin if the route should work only for admin roles)
  router.put('/users/change-password', usersCtrl.verifyToken, usersCtrl.changePassword); // change password
  router.get('/users/:userId', usersCtrl.verifyToken, usersCtrl.getUser); // get user
  router.put('/users/:userId', usersCtrl.verifyToken, usersCtrl.updateUser); // update user

  module.exports = router;

})();
