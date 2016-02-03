'use strict';

var gulp = require('gulp'),
  fs = require('fs'),
  del = require('del'), // Delete files/folders using globs
  jade = require('jade'), // Jade [npm install --save jade]
  gulpJade = require('gulp-jade'), // jade gulp [npm install --save-dev gulp-jade]
  gulpFilter = require('gulp-filter'), // Filter files in a vinyl stream [npm install --save-dev gulp-filter]
  rename = require('gulp-rename'),// rename files {basename:'scripts',prefix:'jquery.',suffix:'.min',extname:'.js'} [npm install --save-dev gulp-rename]
  notify = require('gulp-notify'), // event notification -- .pipe(notify('Minification css finished!')) [npm install --save-dev gulp-notify]
  plumber = require('gulp-plumber'), // tracking error -- .pipe(plumber()) [npm install --save-dev gulp-plumber]
  compass = require('gulp-compass'), // compass + sass -- style: nested, expanded, compact, compressed [npm install --save-dev gulp-compass] [gem update --system] [gem install compass]
  sourcemaps = require('gulp-sourcemaps'), // Source map [npm install --save-dev gulp-sourcemaps]
  htmlhint = require('gulp-htmlhint'),// Validate .html [npm install --save-dev gulp-htmlhint]
  scsslint = require('gulp-scss-lint'), // Validate .scss files with scss-lint [npm install --save-dev gulp-scss-lint] [gem install scss_lint]
  scsslintStylish = require('gulp-scss-lint-stylish2'), // Stylish reporter for gulp-scss-lint [npm install --save-dev gulp-scss-lint-stylish2]
  concat = require('gulp-concat'), // concat css, js files -- .pipe(concat('all.css-js')) [npm install --save-dev gulp-concat]
  autoprefixer = require('gulp-autoprefixer'), // add vendor prefix -webkit, -moz, -ms, -o [npm install --save-dev gulp-autoprefixer]
  connect = require('gulp-connect'), // run a webserver (with LiveReload) [npm install --save-dev gulp-connect]
  livereload = require('gulp-livereload'), // livereload [npm install --save-dev gulp-livereload]
  jshint = require('gulp-jshint'),// validate js. Reporter: default, checkstyle, jslint_xml, non_error, unix; [npm install --save-dev jshint gulp-jshint]
  stylish = require('jshint-stylish'), // Stylish reporter for JSHint (jshint-stylish) [npm install --save-dev jshint-stylish]
//stylish_ex = require('jshint-stylish-ex'), // Stylish reporter for JSHint (jshint-stylish-ex) [npm install --save-dev jshint-stylish-ex]
  uglify = require('gulp-uglify'), // min js [npm install --save-dev gulp-uglify]
  minifyCss = require('gulp-minify-css'), // min css [npm install --save-dev gulp-minify-css]
  realFavicon = require ('gulp-real-favicon'), // Generate a multiplatform favicon with RealFaviconGenerator
  svgstore = require('gulp-svgstore'), // Combine svg files into one with <symbol> elements [npm install --save-dev gulp-svgstore]
  svgmin = require('gulp-svgmin'), // Minify SVG files [npm install --save-dev gulp-svgmin]
  raster = require('gulp-raster'), // svg to png, for retina @2x [npm install --save-dev gulp-raster]
//imagemin = require('gulp-imagemin'), // image optimization [npm install --save imagemin]
  mainBowerFiles = require('main-bower-files'),
  FAVICON_DATA_FILE = 'faviconData.json', // File where the favicon markups are stored
  reporter = scsslintStylish({errorsOnly: false}),
  config = {
    connect: {root: '', port: '8080', host: 'localhost', livereload: true, debug: false},
    bower: {
      paths: {bowerDirectory: 'bower_components', bowerrc: '.bowerrc', bowerJson: 'bower.json'},
      debugging: false, checkExistence: true, includeDev: true
    },
    jade: {jade: jade, pretty: true},
    compass: {
      config_file: 'config.rb', require: false, environment: 'development', http_path: '/',
      css: 'css', font: 'fonts', image: 'img', javascript: 'js', sass: 'sass', style: 'expanded',
      relative: true, comments: false, logging: true, time: true, sourcemap: false, debug: false, task: 'compile' /*watch*/
    },
    autoprefixer: {
      browsers: ['Explorer >= 6', 'Edge >= 12', 'Firefox >= 2', 'Chrome >= 4', 'Safari >= 3.1', 'Opera >= 10.1', 'iOS >= 3.2', 'OperaMini >= 8', 'Android >= 2.1', 'BlackBerry >= 7', 'OperaMobile >= 12', 'ChromeAndroid >= 47', 'FirefoxAndroid >= 42', 'ExplorerMobile >= 10'],
      cascade: false, add: true, remove: false
    },
    minifyCss: {compatibility: 'ie7', debug: true},
    scsslint: {config: '.scss-lint.yml', customReport: reporter.issues},
    jshint: {lookup: true, linter: 'jshint'},
    filter: {restore: true, passthrough: true}
  };

gulp.task('connect', function () {
  connect.server(config.connect);
});

gulp.task('libsBower', function () {
  var filter = gulpFilter(['jquery.raty.js'], config.filter);
  return gulp.src(mainBowerFiles(config.bower))
    .pipe(plumber())
    .pipe(filter)
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(filter.restore)
    .pipe(gulp.dest('libs/'));
});

gulp.task('svg-sprite', function () {
  return gulp.src(['img/svg/*.svg', '!img/svg/*_hover.svg'])
    .pipe(svgmin({js2svg: {pretty: false}}))
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename({basename: "svg", prefix: "", suffix: "-sprite", extname: ".svg"}))
    .pipe(gulp.dest('img/'));
});

gulp.task('retina1dppx', function () {
  gulp.src('img/svg/*.svg')
    .pipe(raster({format: 'png', scale: 1}))
    .pipe(rename({extname: '.png'}))
    .pipe(gulp.dest('img/svgfallback'));
});

gulp.task('retina2dppx', function () {
  gulp.src('img/svg/*.svg')
    .pipe(raster({format: 'png', scale: 2}))
    .pipe(rename({extname: '.png', suffix: '@2x'}))
    .pipe(gulp.dest('img/svgfallback'));
});

gulp.task('svg', ['svg-sprite', 'retina1dppx', 'retina2dppx'], function () {});

gulp.task('jade', function () {
  return gulp.src(['jade/*.jade', '!jade/template.jade'])
    .pipe(plumber())
    .pipe(gulpJade(config.jade))
    .pipe(notify({message: 'Compiling jade in html is successfully completed!', onLast: true}))
    .pipe(gulp.dest('./'))
    .pipe(connect.reload());
});

gulp.task('compass', function () {
  gulp.src(['sass/**/*.scss'])
    .pipe(plumber())
    .pipe(scsslint(config.scsslint))
    .pipe(compass(config.compass))
    .pipe(notify({message: 'Compiling sass in css is successfully completed!'}))
    .pipe(gulp.dest('css/'))
    //.pipe(reporter.printSummary)
    .pipe(connect.reload());
});

gulp.task('css', function () {
  return gulp.src(['css/*.css', '!css/*.min.css'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    //.pipe(autoprefixer(config.autoprefixer))
    .pipe(minifyCss(config.minifyCss))
    .pipe(rename({suffix: '.min'}))
    .pipe(notify({message: 'Minify css completed successfully!', onLast: true}))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('css/'))
    .pipe(connect.reload());
});

gulp.task('autoprefixer', function () {
  return gulp.src(['css/main.css'])
    .pipe(plumber())
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulp.dest('css/'));
});

gulp.task('js', function () {
  return gulp.src(['js/common.js'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(jshint(config.jshint))
    .pipe(jshint.reporter(stylish))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('/'))
    .pipe(notify({
      title: '',
      message: 'Minify js completed successfully!',
      sound: false,
      emitError: true,
      onLast: true,
      logLevel: 2
    }))
    .pipe(gulp.dest('js/'))
    .pipe(connect.reload());
});

//gulp.task('img', function () {
//  gulp.src(['img/**/*', '!img/build/**/*'])
//    .pipe(plumber())
//    .pipe(imagemin({
//      optimizationLevel: 3,
//      progressive: true
//    }))
//    .pipe(gulp.dest('img/build/'));
//});

gulp.task('html-hint', function () {
  gulp.src(['*.html'])
    .pipe(plumber())
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(notify({message: 'Checking html file is successfully completed!'}))
    .pipe(htmlhint.reporter())
    //.pipe(htmlhint.failReporter({ supress: true }));
    .pipe(connect.reload());
});

gulp.task('scss-lint', function () {
  return gulp.src(['sass/**/*.scss'])
    .pipe(plumber())
    .pipe(scsslint(config.scsslint))
    .pipe(reporter.printSummary);
});

gulp.task('js-hint', function () {
  return gulp.src(['js/*.js'])
    .pipe(plumber())
    .pipe(jshint(config.jshint))
    .pipe(jshint.reporter(stylish));
});

gulp.task('jade-watch', ['jade'], function () {
  gulp.watch('jade/*.jade', ['jade']);
});

gulp.task('compass-watch', ['compass'], function () {
  gulp.watch('sass/**/*.scss', ['compass']);
});

gulp.task('watch', ['connect', 'jade', 'js', 'compass'], function () {
  gulp.watch('jade/**/*.jade', ['jade']);
  gulp.watch('*.html', ['html-hint']);
  gulp.watch('sass/**/*.scss', ['compass']);
  gulp.watch(['css/*.css', '!css/*.min.css'], ['css']);
  gulp.watch('js/common.js', ['js']);
  gulp.watch('img/svg/*.svg', ['svg']);
});

gulp.task('clean', function () {
  return del(['build/css', 'build/js', 'build/img']);
});

gulp.task('css-build', function () {
  return gulp.src(['css/*.css', '!css/*.min.css'])
    .pipe(plumber())
    .pipe(minifyCss(config.minifyCss))
    .pipe(rename({suffix: '.min'}))
    .pipe(notify({message: 'Minify css completed successfully!', onLast: true}))
    .pipe(gulp.dest('build/css/'));
});

gulp.task('js-build', function () {
  return gulp.src(['js/common.js'])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(notify({message: 'Minify js completed successfully!', onLast: true}))
    .pipe(gulp.dest('build/js/'));
});

//gulp.task('img-build', function () {
//  gulp.src('img/**/*')
//    .pipe(plumber())
//    .pipe(imagemin({
//      optimizationLevel: 3,
//      progressive: true
//    }))
//    .pipe(gulp.dest('build/img'));
//});

gulp.task('build', ['clean', 'css-build', 'js-build'/*, 'img-build'*/]);

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
  realFavicon.generateFavicon({
    masterPicture: 'img/favicon.png', // 310x310 px
    dest: 'img/favicon',
    iconsPath: 'img/favicon',
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#ffffff',
        margin: '14%',
        appName: 'My app'
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#2b5797',
        onConflict: 'override',
        appName: 'My app'
      },
      androidChrome: {
        pictureAspect: 'shadow',
        themeColor: '#ffffff',
        manifest: {
          name: 'My app',
          display: 'browser',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        }
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: '#ff6347'
      }
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    markupFile: FAVICON_DATA_FILE
  }, function() {
    done();
  });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
  gulp.src([ 'TODO: List of the HTML files where to inject favicon markups' ])
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    .pipe(gulp.dest('TODO: Path to the directory where to store the HTML files'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
  var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, function(err) {
    if (err) {
      throw err;
    }
  });
});

gulp.task('default', ['watch']);