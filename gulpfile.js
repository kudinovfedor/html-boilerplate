var gulp = require('gulp'),
  gulpJade = require('gulp-jade'), // jade gulp
  rename = require("gulp-rename"), // rename files -- .pipe(rename("all.min.css"))
  notify = require("gulp-notify"), // event notification -- .pipe(notify("Minification css finished!"))
  plumber = require('gulp-plumber'), // tracking error -- .pipe(plumber())
  compass = require('gulp-compass'), // compass + sass -- style: nested, expanded, compact, compressed
  htmlhint = require("gulp-htmlhint"),// Validate .html
  scsslint = require('gulp-scss-lint'), // Validate .scss files with scss-lint
  concat = require('gulp-concat'), // concat css, js files -- .pipe(concat('all.css-js'))
  autoprefixer = require('gulp-autoprefixer'), // add vendor prefix -webkit, -moz, -ms, -o
  uglify = require('gulp-uglify'), // min js
  minifyCss = require('gulp-minify-css'); // min css
//sass = require('gulp-sass'), // sass compile to css (node sass)
//imagemin = require('gulp-imagemin'), // image optimization
//jshint = require('gulp-jshint'), // validate js
//jade = require('jade'), // Jade

gulp.task('html', function () {
  gulp.src("*.html")
    .pipe(htmlhint({
      "tagname-lowercase": true,
      "attr-lowercase": true,
      "attr-value-double-quotes": true,
      "attt-value-not-empty": true,
      "attr-no-duplication": true,
      "doctype-first": true,
      "tag-pair": true,
      "tag-self-close": false,
      "spec-char-escape": true,
      "id-unique": true,
      "src-not-empty": true,
      "title-require": true,
      "head-script-disabled": false,
      "alt-require": true,
      "doctype-html5": true,
      "id-class-value": "dash",
      "style-disabled": true,
      "inline-style-disabled": true,
      "inline-script-disabled": true,
      "space-tab-mixed-disabled": "space", //space: only space for indentation, tab: only tab for indentation, false: disable rule
      "id-class-ad-disabled": true,
      "href-abs-or-rel": "rel", // abs: absolute mode, rel: relative mode, false: disable rule
      "attr-unsafe-chars": true
    }))
    .pipe(htmlhint.reporter());
    //.pipe(htmlhint.failReporter({ supress: true }));
});

gulp.task('compass', function () {
  gulp.src('sass/**/*.scss')
    .pipe(plumber())
    .pipe(scsslint({
      'config': 'sass/lint.yml'
    }))
    .pipe(compass({
      style: 'expanded',
      css: 'css',
      sass: 'sass',
      javascript: 'js',
      font: 'fonts',
      image: 'img',
      logging: true,
      time: true,
      relative: true,
      comments: false,
      sourcemap: true,
      debug: false
    }))
    .pipe(notify('Compiling sass in css is successfully completed!'))
    .pipe(gulp.dest('css/'));
});

//gulp.task('sass', function () {
//  gulp.src('sass/**/*.scss')
//    .pipe(plumber())
//    .pipe(scsslint({
//      'config': 'sass/lint.yml'
//    }))
//    .pipe(sass({
//      outputStyle: 'expanded',
//      sourceComments: false
//    }))
//    .pipe(notify('Compiling sass in css is successfully completed!'))
//    .pipe(gulp.dest('css/'));
//});

gulp.task('jade', function () {
  return gulp.src('jade/*.jade')
    .pipe(plumber())
    .pipe(gulpJade({
      //jade: jade,
      pretty: true
    }))
    .pipe(notify('Compiling jade in html is successfully completed!'))
    .pipe(gulp.dest('./'));
});

gulp.task('css', function () {
  return gulp.src(['css/main.css'])
    .pipe(plumber())
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename("main.min.css"))
    .pipe(notify('Minify css completed successfully!'))
    .pipe(gulp.dest('css/'));
});

gulp.task('autoprefixer', function () {
  return gulp.src('css/main.css')
    .pipe(autoprefixer({
      browsers: [
        'Explorer >= 6',
        'Edge >= 12',
        'Firefox >= 2',
        'Chrome >= 4',
        'Safari >= 3.1',
        'Opera >= 10.1',
        'iOS >= 3.2',
        'OperaMini >= 8',
        'Android >= 2.1',
        'BlackBerry >= 7',
        'OperaMobile >= 12',
        'ChromeAndroid >= 47',
        'FirefoxAndroid >= 42',
        'ExplorerMobile >= 10'
      ],
      cascade: false,
      add: true,
      remove: false
    }))
    .pipe(gulp.dest('css/'));
});

gulp.task('js', function () {
  return gulp.src('js/common.js')
    .pipe(plumber())
    //.pipe(jshint())
    //.pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(rename("common.min.js"))
    .pipe(notify('Minify js completed successfully!'))
    .pipe(gulp.dest('js/'));
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

gulp.task('scss-lint', function () {
  return gulp.src('sass/**/*.scss')
    .pipe(scsslint({
      'config': 'sass/lint.yml'
    }));
});

//gulp.task('js-lint', function () {
//  gulp.src('js/*.js')
//    .pipe(plumber())
//    .pipe(jshint())
//    .pipe(jshint.reporter('default'));
//});

gulp.task('html-watch', function () {
  gulp.watch('*.html', ['html']);
});

gulp.task('jade-watch', ['jade'], function () {
  gulp.watch('jade/*.jade', ['jade']);
});

//gulp.task('sass-watch', ['sass'], function () {
//  gulp.watch('sass/**/*.scss', ['sass']);
//});

gulp.task('autoprefixer-watch', ['autoprefixer'], function () {
  gulp.watch('css/main.css', ['autoprefixer']);
});

gulp.task('compass-watch', ['compass'], function () {
  gulp.watch('sass/**/*.scss', ['compass']);
});

gulp.task('watch', ['compass', 'jade', 'html'], function () {
  gulp.watch('sass/**/*.scss', ['compass']);
  gulp.watch('jade/*.jade', ['jade']);
  gulp.watch('*.html', ['html']);
  //gulp.watch('css/main.css', ['autoprefixer']);
  //gulp.watch('css/main.css', ['css']);
  //gulp.watch('js/common.js', ['js']);
});

gulp.task('css-build', function () {
  return gulp.src(['css/main.css'])
    .pipe(plumber())
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename("main.min.css"))
    .pipe(notify('Minify css completed successfully!'))
    .pipe(gulp.dest('build/css/'));
});

gulp.task('js-build', function () {
  return gulp.src('js/common.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename("common.min.js"))
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

gulp.task('build', ['css-build', 'js-build'/*, 'img-build'*/]);

gulp.task('default', ['watch'], function () {});