# Component-based AngularJS v1 client
Component-based AngularJS v1 client app based on [AngularJS-Boilerplate](https://github.com/jbutko/AngularJS-Boilerplate)

# Features
* SASS support including sourceMaps
* Gulp tasks for watching SCSS, JS and HTML files
* production Gulp build task
* clear folder structure
* queryService $http wrapper to handle REST API requests
* localStorage service
* google analytics snippet

## 1. Setup
```bash
npm install
```

## 2. Watch files
```bash
gulp
```
- all SCSS/HTML/JS will be watched for changes and lint errors with browser reloading

## 3. Build production version
```bash
gulp build
```
- build task includes:
* clean _build folder
* compile and minify SASS files
* copy and optimize images
* minify and copy all HTML files into $templateCache
* build index.html with useming package
* copy assets

## 4. Start webserver without watch task
```bash
gulp server
```

## 5. Start webserver from build folder
```bash
gulp server-build
```

Copyright (C) 2017 Jozef Butko<br>
[www.jozefbutko.com](http://www.jozefbutko.com)<br>
[www.github.com/jbutko](http://www.github.com/jbutko)<br>
[@jozefbutko](http://www.twitter.com/jozefbutko)<br>
Released under MIT license
