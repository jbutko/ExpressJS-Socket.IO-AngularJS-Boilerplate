# AngularJS-Boilerplate
Component oriented AngularJS client app based on [AngularJS-Boilerplate](https://github.com/jbutko/AngularJS-Boilerplate)

# Features
* SASS support including sourceMaps
* Minimal CSS styling of the view
* Gulp watch, build and local server tasks
* localStorage service for set, get, remove data
* queryService $http wrapper to handle REST API requests
* clear folder structure
* minified CSS and JS build files
* google analytics snippet

## Download
```bash
git clone git@github.com:jbutko/ExpressJS-Socket.io-AngularJS-Boilerplate.git
```

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
- all SCSS/HTML will be watched for changes and injected into browser thanks to BrowserSync

## 3. Build production version
```bash
gulp build
```
- this will process following tasks:
* clean _build folder
* compile SASS files, minify and uncss compiled css
* copy and optimize images
* minify and copy all HTML files into $templateCache
* build index.html
* minify and copy all JS files
* copy fonts
* show build folder size

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
