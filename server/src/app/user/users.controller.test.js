;(function() {

  'use strict';

  /**
   * API Tests for /users endpoint
   *
   * @desc To run tests start test instance of the API with 'npm run starttest'
   *       and then issue command 'npm test'
   *
   * use it.only or describe.only to test specific test/suite
   */

  var expect = require('chai').expect;
  var request = require('supertest');
  var api = request.agent('http://localhost:5555/api/v1');

  describe('users controller', () => {
    var userId;
    var username;
    var password = 'asdf';
    var token;

    it('should create a new user on /users POST and return status 201', (done) => {
      username = 'johndoe' + Math.random();
      var dummyUser = {
        username: username, // must be unique
        firstName: 'john',
        surname: 'doe',
        password: password,
        email: 'email@email.io',
        role: 'admin'
      };

      api
        .post('/users')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(dummyUser)
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          var response = res.body.data;
          expect(response).to.have.property('username');
          expect(response.username).to.not.equal(null);
          expect(response.username).to.equal(username);

          expect(response).to.have.property('firstName');
          expect(response.firstName).to.not.equal(null);
          expect(response.firstName).to.equal('john');

          expect(response).to.have.property('surname');
          expect(response.surname).to.not.equal(null);
          expect(response.surname).to.equal('doe');

          expect(response).to.have.property('password');
          expect(response.password).to.not.equal(null);

          expect(response).to.have.property('email');
          expect(response.email).to.not.equal(null);
          expect(response.email).to.equal('email@email.io');

          expect(response).to.have.property('role');
          expect(response.role).to.not.equal(null);
          expect(response.role).to.equal('admin');

          // store ID so we can reuse it in other tests
          userId = response._id;
          done();
        });
    });


    it('should authenticate user on /users/authenticate POST', (done) => {
      var credentials = {
        username: username,
        password: 'asdf'
      };

      api
        .post('/users/authenticate')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(credentials)
        .expect(200)
        .end((err, res) => {
          var response = res.body.data;

          // store token so we can send it in header on following requests
          token = response.token;
          done();
        });
    });

    it('should get users on /users GET', (done) => {
      api
        .get('/users')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect(200)
        .end((err, res) => {
          var response = res.body.data;
          expect(response).to.be.an('array');
          expect(response[0]).to.be.an('object');
          expect(response[0]).to.include.keys(['firstName', 'createdAt', 'surname']);
          done();
        });
    });

    it('should return a 404 response error if route can\'t be found', (done) => {
      api
        .get('/')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('should get single user on /users/:userId GET', (done) => {
      api
        .get(`/users/${userId}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          var response = res.body.data;

          expect(response).to.have.property('username');
          expect(response.username).to.not.equal(null);
          expect(response.username).to.equal(username);

          expect(response).to.have.property('firstName');
          expect(response.firstName).to.not.equal(null);
          expect(response.firstName).to.equal('john');

          expect(response).to.have.property('surname');
          expect(response.surname).to.not.equal(null);
          expect(response.surname).to.equal('doe');

          expect(response).to.not.have.property('password');

          expect(response).to.have.property('email');
          expect(response.email).to.not.equal(null);
          expect(response.email).to.equal('email@email.io');

          expect(response).to.have.property('role');
          expect(response.role).to.not.equal(null);
          expect(response.role).to.equal('admin');
          done();
        });
    });

    it('should update user info on /users/:userId PUT', (done) => {
      var dummyUserChanged = {
        firstName: 'john1',
        surname: 'doe1',
        email: 'email1@email.io'
      };

      api
        .put(`/users/${userId}`)
        .send(dummyUserChanged)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          var response = res.body.data;

          expect(response).to.have.property('firstName');
          expect(response.firstName).to.not.equal(null);
          expect(response.firstName).to.equal('john1');

          expect(response).to.have.property('surname');
          expect(response.surname).to.not.equal(null);
          expect(response.surname).to.equal('doe1');

          expect(response).to.have.property('email');
          expect(response.email).to.not.equal(null);
          expect(response.email).to.equal('email1@email.io');
          done();
        });
    });

    it('should change user\'s password on /users/change-password PUT', (done) => {
      password = 'asdf1';
      var passChange = {
        password: password,
        confirmPassword: password
      };

      api
        .put(`/users/change-password`)
        .send(passChange)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect(204, done);
    });

  });

})();
