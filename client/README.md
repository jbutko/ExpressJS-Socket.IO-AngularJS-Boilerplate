# AngularJS-Boilerplate
Component oriented AngularJS client app based on [AngularJS-Boilerplate](https://github.com/jbutko/AngularJS-Boilerplate)

# Features
* SASS support including sourceMaps
* Gulp watch, build and local server tasks
* localStorage service
* queryService $http wrapper to handle REST API requests
* clear folder structure
* Minimal CSS styling of the view
* minified CSS and JS build files
* google analytics snippet

## 1. Setup
```bash
npm install
```
- install all npm and bower dependencies

**Note:** If `npm install` fails during dependency installation it will be likely caused by `gulp-imagemin`. In that case remove `gulp-imagemin` dependency from `package.json`, run `npm install` again and then install `gulp-imagemin` separately with following command: `npm install gulp-imagemin --save-dev`

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

## Contact
Copyright (C) 2016 Jozef Butko<br>
[www.jozefbutko.com](http://www.jozefbutko.com)<br>
[www.github.com/jbutko](http://www.github.com/jbutko)<br>
[@jozefbutko](http://www.twitter.com/jozefbutko)<br>
Released under MIT license
