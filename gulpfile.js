'use strict';

var gulp = require('gulp'),
  del = require('del'), // Delete files/folders using globs
  jade = require('jade'), // Jade [npm install --save jade]
  gulpJade = require('gulp-jade'), // jade gulp [npm install --save-dev gulp-jade]
  gulpFilter = require('gulp-filter'), // Filter files in a vinyl stream [npm install --save-dev gulp-filter]
  rename = require('gulp-rename'), // rename files -- .pipe(rename('all.min.css')) [npm install --save-dev gulp-rename]
  notify = require('gulp-notify'), // event notification -- .pipe(notify('Minification css finished!')) [npm install --save-dev gulp-notify]
  plumber = require('gulp-plumber'), // tracking error -- .pipe(plumber()) [npm install --save-dev gulp-plumber]
  compass = require('gulp-compass'), // compass + sass -- style: nested, expanded, compact, compressed [npm install --save-dev gulp-compass] [gem update --system] [gem install compass]
  sass = require('gulp-sass'), // sass compile to css (node sass) [npm install --save-dev gulp-sass] [npm install --save node-sass]
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
//imagemin = require('gulp-imagemin'), // image optimization [npm install --save imagemin]
  mainBowerFiles = require('main-bower-files'),
  reporter = scsslintStylish({errorsOnly: false}),
  config = {
    connect: {root: '', port: '8080', host: 'localhost', livereload: true, debug: false},
    bower: {
      paths: {bowerDirectory: 'bower_components', bowerrc: '.bowerrc', bowerJson: 'bower.json'},
      debugging: false, checkExistence: true, includeDev: true
    },
    jade: {jade: jade, pretty: true},
    compass: {
      style: 'expanded', css: 'css', sass: 'sass', javascript: 'js', font: 'fonts', image: 'img',
      logging: true, time: true, relative: true, comments: false, sourcemap: true, debug: false
    },
    sass: {outputStyle: 'expanded', sourceComments: false},
    autoprefixer: {
      browsers: ['Explorer >= 6', 'Edge >= 12', 'Firefox >= 2', 'Chrome >= 4', 'Safari >= 3.1', 'Opera >= 10.1', 'iOS >= 3.2', 'OperaMini >= 8', 'Android >= 2.1', 'BlackBerry >= 7', 'OperaMobile >= 12', 'ChromeAndroid >= 47', 'FirefoxAndroid >= 42', 'ExplorerMobile >= 10'],
      cascade: false, add: true, remove: false
    },
    minifyCss: {compatibility: 'ie7', debug: true},
    scsslint: {config: 'sass/lint.yml', customReport: reporter.issues},
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
    .pipe(rename({
      basename: "raty",
      prefix: "jquery.",
      suffix: ".min",
      extname: ".js"
    }))
    .pipe(uglify())
    .pipe(filter.restore)
    .pipe(gulp.dest('libs-bower/'));
});

gulp.task('jade', function () {
  return gulp.src('jade/*.jade')
    .pipe(plumber())
    .pipe(gulpJade(config.jade))
    .pipe(notify('Compiling jade in html is successfully completed!'))
    .pipe(gulp.dest('./'))
    .pipe(connect.reload());
});

gulp.task('compass', function () {
  gulp.src('sass/**/*.scss')
    .pipe(plumber())
    .pipe(scsslint(config.scsslint))
    .pipe(compass(config.compass))
    .pipe(notify('Compiling sass in css is successfully completed!'))
    .pipe(gulp.dest('css/'))
    //.pipe(reporter.printSummary)
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src('sass/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(scsslint(config.scsslint))
    .pipe(sass(config.sass))
    .pipe(sourcemaps.write('/'))
    .pipe(notify('Compiling sass in css is successfully completed!'))
    .pipe(gulp.dest('css/'))
    .pipe(connect.reload());
});

gulp.task('css', function () {
  return gulp.src(['css/main.css'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    //.pipe(autoprefixer(config.autoprefixer))
    .pipe(minifyCss(config.minifyCss))
    .pipe(rename({
      basename: "main",
      prefix: "",
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(notify('Minify css completed successfully!'))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('css/'))
    .pipe(connect.reload());
});

gulp.task('autoprefixer', function () {
  return gulp.src('css/main.css')
    .pipe(plumber())
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulp.dest('css/'));
});

gulp.task('js', function () {
  return gulp.src('js/common.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(jshint(config.jshint))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(uglify())
    .pipe(rename({
      basename: "common",
      prefix: "",
      suffix: ".min",
      extname: ".js"
    }))
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
  gulp.src('*.html')
    .pipe(plumber())
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(notify('Checking html file is successfully completed!'))
    .pipe(htmlhint.reporter())
    //.pipe(htmlhint.failReporter({ supress: true }));
    .pipe(connect.reload());
});

gulp.task('scss-lint', function () {
  return gulp.src('sass/**/*.scss')
    .pipe(plumber())
    .pipe(scsslint(config.scsslint))
    .pipe(reporter.printSummary);
});

gulp.task('js-hint', function () {
  return gulp.src('js/*.js')
    .pipe(plumber())
    .pipe(jshint(config.jshint))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jade-watch', ['jade'], function () {
  gulp.watch('jade/*.jade', ['jade']);
});

gulp.task('compass-watch', ['compass'], function () {
  gulp.watch('sass/**/*.scss', ['compass']);
});

gulp.task('sass-watch', ['sass'], function () {
  gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('watch', ['connect', 'jade', 'html-hint', 'compass', 'js'], function () {
  gulp.watch('jade/*.jade', ['jade']);
  gulp.watch('*.html', ['html-hint']);
  gulp.watch('sass/**/*.scss', ['compass']);
  gulp.watch('css/main.css', ['css']);
  gulp.watch('js/common.js', ['js']);
});

gulp.task('clean', function () {
  return del(['build/css', 'build/js', 'build/img' ]);
});

gulp.task('css-build', function () {
  return gulp.src(['css/main.css'])
    .pipe(plumber())
    .pipe(minifyCss(config.minifyCss))
    .pipe(rename({
      basename: "main",
      prefix: "",
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(notify('Minify css completed successfully!'))
    .pipe(gulp.dest('build/css/'));
});

gulp.task('js-build', function () {
  return gulp.src('js/common.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({
      basename: "common",
      prefix: "",
      suffix: ".min",
      extname: ".js"
    }))
    .pipe(notify('Minify js completed successfully!'))
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

gulp.task('default', ['watch']);