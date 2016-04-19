'use strict';

var
// System
  fs = require('fs'),
  del = require('del'), // Delete files/folders using globs
// npm
  ncu = require('npm-check-updates'), // Upgrade your package.json or bower.json dependencies to the latest versions.
// HTML
  htmlhint = require('gulp-htmlhint'),// Validate *.html [npm install --save-dev gulp-htmlhint]
  html_stylish = require('htmlhint-stylish'), // A Stylish reporter for HTMLHint [npm install --save-dev htmlhint-stylish]
// Jade
  jade = require('gulp-jade'), // Gulp Jade [npm install --save-dev gulp-jade]
  jade_lint = require('gulp-pug-lint'), // Validate *.jade [npm install --save-dev gulp-pug-lint]
// CSS
  cssShorthand = require('gulp-shorthand'), // Makes your CSS files lighter and more readable [npm install --save gulp-shorthand]
  autoprefixer = require('gulp-autoprefixer'), // Add vendor prefix -webkit, -moz, -ms, -o [npm install --save-dev gulp-autoprefixer]
  cmq = require('gulp-combine-media-queries'), // Combine matching media queries into one media query definition [npm install --save-dev gulp-combine-media-queries]
  cssBase64 = require('gulp-css-base64'), // Gulp's task for transform all resources found in a CSS into base64-encoded data URI strings [npm install --save-dev gulp-css-base64]
  minifycss = require('gulp-minify-css'), // min css [npm install --save-dev gulp-minify-css]
// Compass + SCSS(SASS)
  compass = require('gulp-compass'), // compass + sass -- style: nested, expanded, compact, compressed [npm install --save-dev gulp-compass] [gem update --system] [gem install compass]
  scsslint = require('gulp-scss-lint'), // Validate .scss files with scss-lint [npm install --save-dev gulp-scss-lint] [gem install scss_lint]
  scss_stylish = require('gulp-scss-lint-stylish2'), // Stylish reporter for gulp-scss-lint [npm install --save-dev gulp-scss-lint-stylish2]
  reporter = scss_stylish({errorsOnly: false}),
// Images
// imagemin = require('gulp-imagemin'), // Image optimization [npm install --save imagemin]
// Favicon.ico
  realFavicon = require('gulp-real-favicon'), // Generate a multiplatform favicon with RealFaviconGenerator
  FAVICON_DATA_FILE = 'faviconData.json', // File where the favicon markups are stored
// SVG
  svgmin = require('gulp-svgmin'), // Minify SVG files [npm install --save-dev gulp-svgmin]
  svgstore = require('gulp-svgstore'), // Combine svg files into one with <symbol> elements [npm install --save-dev gulp-svgstore]
  raster = require('gulp-raster'), // svg to png, for retina @2x [npm install --save-dev gulp-raster]
// JS(jQuery)
  jscs = require('gulp-jscs'), // Check JavaScript code style with JSCS [npm install --save-dev gulp-jscs]
  cs_stylish = require('gulp-jscs-stylish'), // [npm install --save-dev gulp-jscs-stylish]
  jshint = require('gulp-jshint'),// validate js. Reporter: default, checkstyle, jslint_xml, non_error, unix; [npm install --save-dev jshint gulp-jshint]
  hint_stylish = require('jshint-stylish'), // Stylish reporter for JSHint (jshint-stylish) [npm install --save-dev jshint-stylish]
  uglify = require('gulp-uglify'), // min js [npm install --save-dev gulp-uglify]
// Gulp
  gulp = require('gulp'),
// Gulp useful plugins
  plumber = require('gulp-plumber'), // tracking error -- .pipe(plumber()) [npm install --save-dev gulp-plumber]
  rename = require('gulp-rename'),// rename files {basename:'scripts',prefix:'jquery.',suffix:'.min',extname:'.js'} [npm install --save-dev gulp-rename]
  notify = require('gulp-notify'), // event notification -- .pipe(notify('Minification css finished!')) [npm install --save-dev gulp-notify]
  concat = require('gulp-concat'), // concat css, js files -- .pipe(concat('all.css-js')) [npm install --save-dev gulp-concat]
  sourcemaps = require('gulp-sourcemaps'), // Source map [npm install --save-dev gulp-sourcemaps]
  size = require('gulp-size'), // isplay the size of your project [npm install --save-dev gulp-size]
  filter = require('gulp-filter'), // Filter files in a vinyl stream [npm install --save-dev gulp-filter]
  zip = require('gulp-zip'), // ZIP compress files [npm install --save-dev gulp-zip]
// LiveReload & Browser Syncing
  browserSync = require('browser-sync').create(), // Live CSS Reload & Browser Syncing [npm install --save-dev browser-sync]
// Bower
  mainBowerFiles = require('main-bower-files'), // [npm install --save-dev main-bower-files]
// Modernizr
  modernizr = require('gulp-modernizr'), // Gulp wrapper for custom Modernizr builds [npm install --save-dev gulp-modernizr]
// Config
  config = {
    // Config Jade
    jade: {pretty: true},
    // Config CSS Autoprefixer
    autoprefixer: {
      browsers: ['Explorer >= 6', 'Edge >= 12', 'Firefox >= 2', 'Chrome >= 4', 'Safari >= 3.1', 'Opera >= 10.1', 'iOS >= 3.2', 'OperaMini >= 8', 'Android >= 2.1', 'BlackBerry >= 7', 'OperaMobile >= 12', 'ChromeAndroid >= 47', 'FirefoxAndroid >= 42', 'ExplorerMobile >= 10'],
      cascade: false, add: true, remove: false
    },
    // Config CSS Combine Media Queries
    cmd: {log: false, use_external: false},
    // Config CSS base64
    cssBase64: {
      baseDir: '../img/', maxWeightResource: 10 * 1024,
      extensionsAllowed: ['.svg', '.png', '.jpg', '.gif'] /*base64:skip*/
    },
    // Config CSS minify
    minifycss: {compatibility: 'ie7', debug: true},
    // Config Compass + SCSS(SASS)
    compass: {
      config_file: 'config.rb', require: false, environment: 'development', http_path: '/',
      css: 'css', font: 'fonts', image: 'img', javascript: 'js', sass: 'sass', style: 'expanded', relative: true,
      comments: false, logging: true, time: true, sourcemap: false, debug: false, task: 'compile' /*watch*/
    },
    // Config SCSS(SASS) Lint
    scsslint: {config: '.scss-lint.yml', customReport: reporter.issues},
    // Config jscs
    jscs: {fix: false, configPath: '.jscsrc'},
    // Config JS Hint
    jshint: {lookup: true, linter: 'jshint'},
    // Config BrowserSync
    bs: {
      ui: false, server: {baseDir: './'}, port: 8080, ghostMode: {clicks: true, forms: true, scroll: true},
      logLevel: 'info', logPrefix: 'BrowserSync', logFileChanges: false, online: false,
      reloadOnRestart: true, notify: true
    },
    // Config Bower
    bower: {
      paths: {bowerDirectory: 'bower_components', bowerrc: '.bowerrc', bowerJson: 'bower.json'},
      debugging: false, checkExistence: true, includeDev: true
    },
    // Config Gulp file size
    fileSize: {title: 'The size', gzip: false, pretty: true, showFiles: true, showTotal: true},
    // Config Gulp filter
    filter: {restore: true, passthrough: true}
  };

function errorAlert(error) {
  notify.onError({title: 'Error', subtitle: 'Failure!', message: 'Check your terminal', sound: 'Sosumi'})(error); // Error Notification
  console.log(error.toString()); // Prints Error to Console
  this.emit('end'); // End function
}

gulp.task('server', function () {
  browserSync.init(config.bs);
});

gulp.task('ncu', function () {
  ncu.run({
    packageFile: 'package.json'
    // Any command-line option can be specified here.
    // These are set by default:
    // silent: true,
    // jsonUpgraded: true
  }).then(function (upgraded) {
    console.log('dependencies to upgrade:', upgraded);
  });
});

gulp.task('libsBower', function () {
  return gulp.src(mainBowerFiles(config.bower))
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(gulp.dest('libs/'));
});

gulp.task('svg-sprite', function () {
  return gulp.src(['img/svg/*.svg', '!img/svg/*_hover.svg'])
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(svgmin({js2svg: {pretty: false}}))
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename({basename: 'svg', prefix: '', suffix: '-sprite', extname: '.svg'}))
    .pipe(gulp.dest('img/'));
});

gulp.task('retina1dppx', function () {
  return gulp.src('img/svg/*.svg')
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(raster({format: 'png', scale: 1}))
    .pipe(rename({extname: '.png'}))
    .pipe(gulp.dest('img/svgfallback'));
});

gulp.task('retina2dppx', function () {
  return gulp.src('img/svg/*.svg')
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(raster({format: 'png', scale: 2}))
    .pipe(rename({extname: '.png', suffix: '@2x'}))
    .pipe(gulp.dest('img/svgfallback'));
});

gulp.task('svg', ['svg-sprite', 'retina1dppx'/*, 'retina2dppx'*/], function () {});

gulp.task('ie8', function () {
  return gulp.src(['libs/html5shiv.min.js', 'libs/respond.min.js'])
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(size(config.fileSize))
    .pipe(concat('ie8.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(size(config.fileSize))
    .pipe(gulp.dest('js/'));
});

gulp.task('all-js', function () {
  return gulp.src(['libs/device.min.js', 'libs/modernizr.min.js', 'libs/jquery.min.js'])
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(size(config.fileSize))
    .pipe(concat('all.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(size(config.fileSize))
    .pipe(gulp.dest('js/'));
});

gulp.task('jade', function () {
  return gulp.src(['jade/*.jade', '!jade/template.jade'])
    .pipe(plumber({errorHandler: errorAlert}))
    //.pipe(jade_lint())
    .pipe(jade(config.jade))
    //.pipe(notify({title: 'Success', message: 'Compiling jade in html is successfully completed!', onLast: true}))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

gulp.task('compass', function () {
  gulp.src(['sass/**/*.scss'])
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(scsslint(config.scsslint))
    .pipe(compass(config.compass))
    //.pipe(notify({title: 'Success', message: 'Compiling sass in css is successfully completed!', onLast: true}))
    .pipe(gulp.dest('css/'))
    //.pipe(reporter.printSummary)
    .pipe(browserSync.stream());
});

gulp.task('css', function () {
  return gulp.src(['css/*.css', '!css/*.min.css'])
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(sourcemaps.init())
    //.pipe(cssShorthand()) // This plugin worked not very well
    //.pipe(autoprefixer(config.autoprefixer))
    //.pipe(cmq(config.cmd)) // Give error buffer.js:148 throw new TypeError('must start with number, buffer, array or string');
    .pipe(cssBase64(config.cssBase64))
    .pipe(minifycss(config.minifycss))
    .pipe(rename({suffix: '.min'}))
    //.pipe(notify({title: 'Success', message: 'Minify css completed successfully!', onLast: true}))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
});

gulp.task('autoprefixer', function () {
  gulp.src(['css/main.css'])
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulp.dest('css/'));
});

gulp.task('js', function () {
  gulp.src(['js/common.js'])
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(sourcemaps.init())
    .pipe(jscs(config.jscs))
    //.pipe(jscs.reporter())
    .pipe(cs_stylish())
    .pipe(jshint(config.jshint))
    .pipe(jshint.reporter(hint_stylish))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('/'))
    //.pipe(notify({title: 'Success', message: 'Minify js completed successfully!', onLast: true}))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
});

//gulp.task('img', function () {
//  gulp.src(['img/**/*', '!img/build/**/*'])
//    .pipe(plumber({errorHandler: errorAlert}))
//    .pipe(imagemin({
//      optimizationLevel: 3,
//      progressive: true
//    }))
//    .pipe(gulp.dest('img/build/'));
//});

gulp.task('html-hint', function () {
  return gulp.src(['*.html'])
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(htmlhint('.htmlhintrc'))
    //.pipe(notify({title: 'Success', message: 'Checking html file is successfully completed!', onLast: true}))
    //.pipe(htmlhint.reporter())
    .pipe(htmlhint.reporter(html_stylish));
});

gulp.task('scss-lint', function () {
  return gulp.src(['sass/**/*.scss'])
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(scsslint(config.scsslint))
    .pipe(reporter.printSummary);
});

gulp.task('jscs', function () {
  gulp.src(['js/common.js'])
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(jscs(config.jscs))
    //.pipe(jscs.reporter())
    .pipe(cs_stylish());
});

gulp.task('jshint', function () {
  gulp.src(['js/common.js'])
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(jshint(config.jshint))
    .pipe(jshint.reporter(hint_stylish));
});

gulp.task('jade-watch', ['jade'], function () {
  gulp.watch('jade/**/*.jade', ['jade']);
});

gulp.task('compass-watch', ['compass'], function () {
  gulp.watch('sass/**/*.scss', ['compass']);
});

gulp.task('watch', ['server', 'jade', 'js', 'compass'], function () {
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
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(size(config.fileSize))
    .pipe(minifycss(config.minifycss))
    .pipe(rename({suffix: '.min'}))
    //.pipe(notify({title: 'Success', message: 'Minify css completed successfully!', onLast: true}))
    .pipe(size(config.fileSize))
    .pipe(gulp.dest('build/css/'));
});

gulp.task('js-build', function () {
  gulp.src(['js/common.js'])
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(size(config.fileSize))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    //.pipe(notify({title: 'Success', message: 'Minify js completed successfully!', onLast: true}))
    .pipe(size(config.fileSize))
    .pipe(gulp.dest('build/js/'));
});

//gulp.task('img-build', function () {
//  gulp.src('img/**/*')
//    .pipe(plumber({errorHandler: errorAlert}))
//    .pipe(imagemin({
//      optimizationLevel: 3,
//      progressive: true
//    }))
//    .pipe(gulp.dest('build/img'));
//});

gulp.task('build', ['clean', 'css-build', 'js-build'/*, 'img-build'*/]);

gulp.task('modernizr', function () {
  gulp.src('js/common.js')
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(modernizr('modernizr.js', {
      "devFile": false,
      //"dest": "libs/modernizr.js",
      "crawl": false,
      "uglify": false,
      "useBuffers": false,
      "customTests": [],
      "tests": [
        "input",
        "inputtypes",
        "svg",
        "cssanimations",
        "backdropfilter",
        "borderradius",
        "boxshadow",
        "boxsizing",
        "csscalc",
        "checked",
        "cubicbezierrange",
        "ellipsis",
        "cssfilters",
        "flexbox",
        "flexwrap",
        "fontface",
        "generatedcontent",
        "cssgradients",
        "csshairline",
        "hsla",
        "cssinvalid",
        "lastchild",
        "cssmask",
        "mediaqueries",
        "multiplebgs",
        "nthchild",
        "opacity",
        "csspointerevents",
        "cssreflections",
        "regions",
        "rgba",
        "supports",
        "csstransforms",
        "csstransforms3d",
        "preserve3d",
        "csstransitions",
        "cssvalid",
        "placeholder",
        "scriptasync",
        "scriptdefer",
        "svgasimg",
        "svgclippaths",
        "svgfilters",
        "svgforeignobject",
        "inlinesvg",
        "smil",
        "textareamaxlength"
      ],
      "options": [
        "domPrefixes",
        "prefixes",
        "addTest",
        "atRule",
        "hasEvent",
        "mq",
        "prefixed",
        "prefixedCSS",
        "prefixedCSSValue",
        "testAllProps",
        "testProp",
        "testStyles",
        //"html5printshiv",
        //"html5shiv",
        "setClasses"
      ]
    }))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('libs/'));
});

gulp.task('zip', function () {
  return gulp.src([
    'css/**',
    'fonts/**',
    'img/**',
    'js/**',
    'libs/**',
    '*.html',
    '.htaccess',
    'favicon.ico'
  ], {base: '.'})
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(zip('archive.zip', {compress: true}))
    .pipe(size(config.fileSize))
    .pipe(gulp.dest('./'));
});

gulp.task('zip-all', function () {
  return gulp.src([
    'css/**',
    'fonts/**',
    'img/**',
    'jade/**',
    'js/**',
    'libs/**',
    'sass/**',
    '!.git',
    '!.idea',
    '!.sass-cache',
    '!bower_components',
    '!node_modules',
    '*.*',
    '.*'
  ], {base: '.'})
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(zip('archive_all.zip', {compress: true}))
    .pipe(size(config.fileSize))
    .pipe(gulp.dest('./'));
});

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function (done) {
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
  }, function () {
    done();
  });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function () {
  gulp.src(['TODO: List of the HTML files where to inject favicon markups'])
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    .pipe(gulp.dest('TODO: Path to the directory where to store the HTML files'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function (done) {
  var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, function (err) {
    if (err) {
      throw err;
    }
  });
});

gulp.task('default', ['watch']);