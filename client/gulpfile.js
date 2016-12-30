/**
 * The build process consists of following steps:
 * 1. clean /_build folder
 * 2. compile SASS files, minify and uncss compiled css
 * 3. copy and minimize images
 * 4. minify and copy all HTML files into $templateCache
 * 5. build index.html
 * 6. minify and copy all JS files
 * 7. copy fonts
 * 8. show build folder size
 *
 */
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

// browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './src/',
    },
    notify: false,
    port: 4000,
  });

});

// minify JS
gulp.task('minify-js', function() {
  gulp.src('js/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('./_build/'));
});

// minify CSS
gulp.task('minify-css', function() {
  gulp.src(['./styles/**/*.css', '!./styles/**/*.min.css'])
    .pipe($.rename({suffix: '.min'}))
    .pipe($.minifyCss({keepBreaks:true}))
    .pipe(gulp.dest('./styles/'))
    .pipe(gulp.dest('./_build/css/'));
});

// minify HTML
gulp.task('minify-html', function() {
  var opts = {
    comments: true,
    spare: true,
    conditionals: true
  };

  gulp.src('./**/.html')
    .pipe($.minifyHtml(opts))
    .pipe(gulp.dest('./_build/'));
});

// copy fonts from a module outside of our project (like Bower)
gulp.task('fonts', function() {
  gulp.src('./src/assets/fonts/**/*.{ttf,woff,eof,eot,svg}')
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

// start webserver from _build folder to check how it will look in production
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

// delete build folder
gulp.task('clean:build', function (cb) {
  del([
    './_build/'
    // if we don't want to clean any file we can use negate pattern
    //'!dist/mobile/deploy.json'
  ], cb);
});

// concat files
gulp.task('concat', function() {
  gulp.src('./js/*.js')
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
  var s = $.size();

  return gulp.src('styles/style.scss')
    .pipe($.sass({
      style: 'compact'
    }))
    .pipe($.autoprefixer('last 3 version'))
    // .pipe($.uncss({
    //   html: ['./index.html', './views/**/*.html', './components/**/*.html'],
    //   ignore: [
    //     '.index',
    //     '.slick',
    //     /\.owl+/,
    //     /\.owl-next/,
    //     /\.owl-prev/
    //   ]
    // }))
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('_build/css'));
});

// index.html build
// script/css concatenation
gulp.task('usemin', function() {
  return gulp.src('./src/index.html')
    // add templates path
    .pipe($.htmlReplace({
      'templates': '<script type="text/javascript" src="js/templates.js"></script>'
    }))
    .pipe($.usemin())
    // .pipe($.usemin({
    //   css: [$.minifyCss(), 'concat'],
    //   libs: [],
    //   nonangularlibs: [],
    //   angularlibs: [],
    //   appcomponents: [],
    //   mainapp: []
    // }))
    .pipe(gulp.dest('./_build/'));
});

// make templateCache from all HTML files
gulp.task('templates', function() {
  return gulp.src([
      './src/**/*.html',
      '!bower_components/**/*.*',
      '!node_modules/**/*.*',
      '!_build/**/*.*'
    ])
    // .pipe($.minifyHtml())
    .pipe($.angularTemplatecache({
      module: 'boilerplate'
    }))
    .pipe(gulp.dest('_build/js'));
});

// reload all Browsers
gulp.task('bs-reload', function() {
  browserSync.reload();
});

// calculate build folder size
gulp.task('build:size', function() {
  var s = $.size();

  return gulp.src('./_build/**/*.*')
    .pipe(s)
    .pipe($.notify({
      onLast: true,
      message: function() {
        return 'Total build size ' + s.prettySize;
      }
    }));
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

// JS files linting
gulp.task('lint', function() {
  return gulp.src('src/app/**/*.js')
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.notify(notifyJshintError));
});

// default task to be run with `gulp` command
gulp.task('default', ['browser-sync', 'sass', 'minify-css', 'lint'], function() {
  gulp.watch('./styles/*.css', function(file) {
    if (file.type === "changed") {
      reload(file.path);
    }
  });
  gulp.watch(['./src/app/**/*.html', './src/index.html'], ['bs-reload']);
  gulp.watch(['./src/app/**/*.js', './src/config/*.js'], ['lint', 'bs-reload']);
  gulp.watch(['./styles/**/*.scss', './src/**/*.scss'], ['sass', 'minify-css']);
});

/**
 * build task:
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
