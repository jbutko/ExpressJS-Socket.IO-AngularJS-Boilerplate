var gulp = require('gulp');
var browserSync = require('browser-sync')
var reload = browserSync.reload;
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var modRewrite = require('connect-modrewrite');

// optimize images
gulp.task('images', function() {
  return gulp.src('./src/assets/img/**/*')
    .pipe($.changed('./_build/assets/img'))
    .pipe($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('./_build/assets/img'));
});

// browser-sync task
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './src/',
    },
    notify: false,
    port: 4000,
  })
});

// minify CSS
gulp.task('minify-css', function() {
  return gulp.src(['./styles/**/*.css', '!./styles/**/*.min.css'])
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.minifyCss({ keepBreaks: true }))
    .pipe(gulp.dest('./styles/'))
    .pipe(gulp.dest('./_build/css/'));
});

// copy fonts
gulp.task('fonts', function() {
  return gulp.src('./src/assets/fonts/**/*.{ttf,woff,eof,eot,svg}')
    .pipe($.changed('./_build/fonts'))
    .pipe(gulp.dest('./_build/fonts'));
});

// start webserver
gulp.task('server', function(done) {
  return browserSync({
    server: {
      baseDir: './',
      middleware: [
        modRewrite(['^([^.]+)$ /index.html [L]'])
      ]
    },
    port: 4000
  }, done);
});

// start webserver from _build folder to preview built version of the app
gulp.task('server-build', function(done) {
  return browserSync({
    server: {
      baseDir: './_build/',
      middleware: [
        modRewrite(['^([^.]+)$ /index.html [L]'])
      ]
    },
    port: 4001
  }, done);
});

// clear build folder
gulp.task('clean:build', function(cb) {
  return del([
    './_build/'
  ], cb);
});

// concat files
gulp.task('concat', function() {
  return gulp.src('./js/*.js')
    .pipe($.concat('scripts.js'))
    .pipe(gulp.dest('./_build/'));
});

// SASS task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function() {
  return gulp.src('./styles/style.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      style: 'expanded'
    }))
    .on('error', $.notify.onError(function(error) {
      return 'SASS Failed: ' + error.message;
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('styles'))
    .pipe(gulp.dest('./src/assets/styles'))
    .pipe(reload({
      stream: true
    }))
    .pipe($.notify({
      message: 'Styles task complete'
    }));
});

// SASS Build task
gulp.task('sass:build', function() {
  return gulp.src('./styles/style.scss')
    .pipe($.sass({
      style: 'compact'
    }))
    .pipe($.autoprefixer('last 3 version'))
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('_build/css'));
});

// generate and copy index.html
// script/css concatenation
gulp.task('usemin', function() {
  return gulp.src('./src/index.html')
    // add templates path
    .pipe($.htmlReplace({
      'templates': '<script type="text/javascript" src="js/templates.js"></script>'
    }))
    .pipe($.usemin({
      css: [$.minifyCss(), 'concat'],
      angularlibs: [$.uglify()],
      appcomponents: [$.uglify()],
    }))
    .pipe(gulp.dest('./_build/'));
});

// add HTML files to $templateChace
gulp.task('templates', function() {
  return gulp.src([
      './src/**/*.html',
      '!bower_components/**/*.*',
      '!node_modules/**/*.*',
      '!_build/**/*.*'
    ])
    .pipe($.minifyHtml())
    .pipe($.angularTemplatecache({
      module: 'boilerplate' // change this if you name your main app module differently
    }))
    .pipe(gulp.dest('_build/js'));
});

// reload browser on changes
gulp.task('bs-reload', function() {
  browserSync.reload();
});

// jshint notification
function notifyJshintError(file) {
  var ignoredFiles = [
    'angucomplete-alt.js'
  ];

  var isIgnoredFile = ignoredFiles.indexOf(ignoredFiles) > -1;

  // don't show something if success
  if (file && file.jshint && file.jshint.success || isIgnoredFile)
    return false;

  if (file && !file.jshint)
    return false;

  var errors = file.jshint.results.map(function(data) {
    if (data.error) {
      return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
    }
  }).join('\n');

  return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
}

// lint JS files
gulp.task('lint', function() {
  return gulp.src('src/app/**/*.js')
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.notify(notifyJshintError));
});

// default task to be run with `gulp` command
gulp.task('default', ['browser-sync', 'sass', 'minify-css', 'lint'], function() {
  gulp.watch('./styles/*.css', function(file) {
    if (file.type === 'changed') {
      reload(file.path);
    }
  });
  gulp.watch(['./src/app/**/*.html', './src/index.html'], ['bs-reload']);
  gulp.watch(['./src/app/**/*.js', './src/config/*.js'], ['lint', 'bs-reload']);
  gulp.watch(['./styles/**/*.scss', './src/**/*.scss'], ['sass', 'minify-css']);
});

/**
 * Build process consists of following steps:
 * 1. clean /_build folder
 * 2. compile SASS files, minify and uncss compiled css
 * 3. copy and optimize images
 * 4. minify and copy all HTML files into $templateCache
 * 5. copy index.html
 * 6. minify, concat and copy all JS files
 * 7. copy fonts
 */
gulp.task('build', function(callback) {
  runSequence(
    'clean:build',
    'sass:build',
    'images',
    'templates',
    'usemin',
    'fonts',
    callback);
});
