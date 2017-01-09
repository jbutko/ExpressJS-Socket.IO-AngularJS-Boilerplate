# ExpressJS, Socket.IO & AngularJS Boilerplate

Do not waste your valuable time when you are starting with new project by configuring app and folder structure - use *ExpressJS, Socket.IO & AngularJS Boilerplate* and start working straight on what really matters.

***

## FEATURES:
*Server* [[documentation]](https://github.com/jbutko/ExpressJS-Socket.IO-AngularJS-Boilerplate/blob/master/server/README.md)
* ExpressJS API with JSON web token (JWT) authentification
* Socket.IO for realtime messages implemented both on ExpressJS API as well as AngularJS client
* Mocha test runner to test your ExpressJS app
* Tests for user controller
* Built in packages for paginated responses or request parameters checking with express-validator
* Postman collection to test out API endpoints in Postman desktop app
* PM2 process files in JSON format for dev/production enviroments

*Client* [[documentation]](https://github.com/jbutko/ExpressJS-Socket.IO-AngularJS-Boilerplate/blob/master/client/README.md)
* Component oriented AngularJS client app built on version 1.6.x
* Token based user authetification (Auth component and Auth interceptor)
* Routes for user signup,change user password, user list and update user
* SASS preprocessor with bootstrap grid system
* Gulp with browser-sync for serving app including tasks for SASS files compilation, JShint linting or build task for generating minified production version
* UI-Router for seamless AngularJS routing

***
## SETUP
```bash
git clone https://github.com/jbutko/ExpressJS-Socket.IO-AngularJS-Boilerplate.git myProject
```
*Server*
```bash
cd myProject/server && npm install && npm start
```
*Client*
```bash
cd myProject/client && npm install && gulp
```

## Contact
Copyright (C) 2017 Jozef Butko<br>
[www.jozefbutko.com](http://www.jozefbutko.com)<br>
[www.github.com/jbutko](http://www.github.com/jbutko)<br>
[@jozefbutko](http://www.twitter.com/jozefbutko)<br>
Released under MIT license

## Changelog
### 1.0.1
- 1.0.1: cleanup<br>
07.01.2017

### 1.0.0
- 1.0.0: initial release<br>
07.01.2017
