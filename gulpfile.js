'use strict';

// Gulp
var gulp = require('gulp');
// System
var fs = require('fs');
var del = require('del');
// HTML
var htmlhint = require('gulp-htmlhint');
var html_stylish = require('htmlhint-stylish');
// Pug (Jade)
var pug = require('gulp-pug');
// var pug_lint = require('gulp-pug-lint');
// CSS
// var cmq = require('gulp-combine-media-queries');
var cssBase64 = require('gulp-css-base64');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
// SCSS
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var scsslint = require('gulp-scss-lint');
var scss_stylish = require('gulp-scss-lint-stylish2');
var reporter = scss_stylish({errorsOnly: false});
// Images
// var imagemin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith');
// Favicon.ico
var realFavicon = require('gulp-real-favicon');
var FAVICON_DATA_FILE = 'faviconData.json';
// SVG
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var raster = require('gulp-raster');
// JS(jQuery)
var jshint = require('gulp-jshint');
var hint_stylish = require('jshint-stylish');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
// Gulp useful plugins
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
//var size = require('gulp-size');
//var filter = require('gulp-filter');
var zip = require('gulp-zip');
// LiveReload & Browser Syncing
var browserSync = require('browser-sync').create();
// Bower
var mainBowerFiles = require('main-bower-files');
// Modernizr
var modernizr = require('gulp-modernizr');
// Config
var config = {
  // Config Pug (Jade)
  pug: {pretty: true},
  // Config CSS Autoprefixer
  autoprefixer: {
    browsers: ['Explorer >= 6', 'Edge >= 12', 'Firefox >= 2', 'Chrome >= 4', 'Safari >= 3.1', 'Opera >= 10.1', 'iOS >= 3.2', 'OperaMini >= 8', 'Android >= 2.1', 'BlackBerry >= 7', 'OperaMobile >= 12', 'ChromeAndroid >= 47', 'FirefoxAndroid >= 42', 'ExplorerMobile >= 10'],
    cascade: false, add: true, remove: false
  },
  // Config CSS Combine Media Queries
  //cmd: {log: false, use_external: false},
  // Config CSS base64
  cssBase64: {
    baseDir: '../img/', maxWeightResource: 10 * 1024,
    extensionsAllowed: ['.svg', '.png', '.jpg', '.gif'] /*base64:skip*/
  },
  // Config CSS minify
  cleancss: {compatibility: 'ie7', debug: true},
  // Config SCSS(SASS)
  sass: {outputStyle: 'expanded', precision: 5, errLogToConsole: true, sourceComments: false},
  // Config Compass + SCSS(SASS)
  compass: {
    config_file: 'src/config.rb', require: false, environment: 'development', http_path: '/', project_path: 'src',
    css: 'src/css', font: 'src/fonts', image: 'src/img', javascript: 'src/js', sass: 'src/sass', style: 'expanded', relative: true,
    comments: true, logging: true, time: true, sourcemap: true, debug: false, task: 'compile' /*watch*/
  },
  // Config SCSS(SASS) Lint
  scsslint: {config: 'src/.scss-lint.yml', customReport: reporter.issues},
  // Config img
  sprite: {
    imgName: 'sprite.png', cssName: 'sprite.css', imgPath: '../img/sprite.png',
    padding: 1, algorithm: 'binary-tree', cssFormat: 'scss',
    cssVarMap: function (sprite) {
      sprite.name = 's-' + sprite.name;
    }, cssTemplate: 'src/scss.template.handlebars',
    cssOpts: {
      cssSelector: function (sprite) {
        return '.icon-' + sprite.name;
      }
    }
  },
  // Config JSHint
  jshint: {lookup: true, linter: 'jshint'},
  // Config ESLint
  eslint: {configFile: '.eslintrc.json'},
  // Config BrowserSync
  bs: {
    ui: false, server: {baseDir: './'}, port: 8080, ghostMode: {clicks: true, forms: true, scroll: true},
    logLevel: 'info', logPrefix: 'BrowserSync', logFileChanges: true, online: false,
    reloadOnRestart: true, notify: true
  },
  // Config Bower
  bower: {
    paths: {bowerDirectory: 'bower_components', bowerrc: '.bowerrc', bowerJson: 'bower.json'},
    debugging: false, checkExistence: true, includeDev: true
  }
  // Config Gulp file size
  //fileSize: {title: 'The size', gzip: false, pretty: true, showFiles: true, showTotal: true},
  // Config Gulp filter
  //filter: {restore: true, passthrough: true}
};

var src = 'src/',
    dist = 'dist/';

var path = {
  src: {
    html: [src+'*.html'],
    pug: [src+'pug/*.pug'],
    css: [src+'css/*.css', !src+'css/*.min.css'],
    sass: [src+'sass/**/*.{scss,sass}'],
    sprite: [src+'img/sprite/*.*'],
    img: [src+'img/**/*'],
    svg: [src+'img/svg/*.svg'],
    js: [src+'js/common.js']
  },
  dest: {
    pug: src,
    css: src+'css',
    sass: src+'css',
    img: [src+'img/optimized'],
    sprite: [src+'img'],
    sprite_css: [src+'img'],
    svg: src+'img',
    svgfallback: src+'img/svgfallback',
    js: src+'js'
  },
  watch: {
    html: [src+'*.html'],
    pug: [src+'pug/**/*.pug'],
    img: [],
    sprite: [src+'img/sprite/*.*'],
    svg: [src+'img/svg/*.svg'],
    css: [src+'css/*.css', !src+'css/*.min.css'],
    sass: [src+'sass/**/*.{scss,sass}'],
    js: [src+'js/common.js']
  }
};

function errorAlert(error) {
  notify.onError({title: 'Error', subtitle: 'Failure!', message: 'Check your terminal', sound: 'Sosumi'})(error); // Error Notification
  console.log(error.toString()); // Prints Error to Console
  this.emit('end'); // End function
}

gulp.task('server', function () {
  browserSync.init(config.bs);
});

gulp.task('libsBower', function () {
  return gulp.src(mainBowerFiles(config.bower))
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(gulp.dest('src/js/libs'));
});

gulp.task('svg-sprite', function () {
  return gulp.src([path.src.svg, '!img/svg/*_hover.svg'])
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(svgmin({js2svg: {pretty: false}}))
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename({basename: 'svg', prefix: '', suffix: '-sprite', extname: '.svg'}))
    .pipe(gulp.dest(path.dest.svg));
});

gulp.task('retina1dppx', function () {
  return gulp.src(path.src.svg)
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(raster({format: 'png', scale: 1}))
    .pipe(rename({extname: '.png'}))
    .pipe(gulp.dest(path.dest.svgfallback));
});

gulp.task('retina2dppx', function () {
  return gulp.src(path.src.svg)
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(raster({format: 'png', scale: 2}))
    .pipe(rename({extname: '.png', suffix: '@2x'}))
    .pipe(gulp.dest(path.dest.svgfallback));
});

gulp.task('svg', gulp.series('svg-sprite', 'retina1dppx'/*, 'retina2dppx'*/));

gulp.task('ie8', function () {
  return gulp.src(['js/libs/html5shiv.min.js', 'js/libs/respond.min.js'])
    .pipe(plumber({errorHandler: errorAlert}))
    //.pipe(size(config.fileSize))
    .pipe(concat('ie8.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    //.pipe(size(config.fileSize))
    .pipe(gulp.dest(path.dest.js));
});

gulp.task('all-js', function () {
  return gulp.src(['js/libs/device.min.js', 'js/libs/modernizr.min.js', 'js/libs/jquery.min.js'])
    .pipe(plumber({errorHandler: errorAlert}))
    //.pipe(size(config.fileSize))
    .pipe(concat('all.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    //.pipe(size(config.fileSize))
    .pipe(gulp.dest(path.dest.js));
});

gulp.task('sprite', function () {
  var spriteData =
    gulp.src(path.src.sprite) // путь, откуда берем картинки для спрайта
      .pipe(spritesmith(config.sprite));
  spriteData.img.pipe(gulp.dest(path.dest.sprite)); // путь, куда сохраняем картинку
  return spriteData.css.pipe(gulp.dest(path.dest.sprite_css)); // путь, куда сохраняем стили
});

gulp.task('pug', function () {
  return gulp.src(path.src.pug)
    .pipe(plumber({errorHandler: errorAlert}))
    //.pipe(pug_lint())
    .pipe(pug(config.pug))
    .pipe(gulp.dest(path.dest.pug))
    .pipe(browserSync.stream());
});

gulp.task('sass', function () {
  return gulp.src(path.src.sass)
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(sourcemaps.init())
    .pipe(sass(config.sass).on('error', sass.logError))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(path.dest.sass));
});

gulp.task('compass', function () {
  return gulp.src(path.src.sass)
    //.pipe(plumber({errorHandler: errorAlert}))
    .pipe(compass(config.compass))
    .pipe(gulp.dest(path.dest.sass))
    .pipe(browserSync.stream());
});

gulp.task('css', gulp.series(clean_map, function () {
  return gulp.src(path.src.css)
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(sourcemaps.init())
    //.pipe(autoprefixer(config.autoprefixer))
    //.pipe(cmq(config.cmd)) // Give error buffer.js:148 throw new TypeError('must start with number, buffer, array or string');
    .pipe(cssBase64(config.cssBase64))
    .pipe(cleancss(config.cleancss))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(path.dest.css));
}));

gulp.task('js', function () {
  return gulp.src(path.src.js)
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(sourcemaps.init())
    .pipe(jshint(config.jshint))
    .pipe(jshint.reporter(hint_stylish))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(path.dest.js));
});

gulp.task('build', gulp.parallel('css', 'js'));

//gulp.task('img', function () {
//  gulp.src(path.src.img)
//    .pipe(plumber({errorHandler: errorAlert}))
//    .pipe(imagemin({
//      optimizationLevel: 3,
//      progressive: true
//    }))
//    .pipe(gulp.dest(path.dest.img));
//});

gulp.task('autoprefixer', function () {
  gulp.src(['css/main.css'])
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulp.dest(path.dest.css));
});

gulp.task('html-hint', function () {
  return gulp.src(path.src.html)
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(htmlhint('.htmlhintrc'))
    //.pipe(htmlhint.reporter())
    .pipe(htmlhint.reporter(html_stylish));
});

gulp.task('scss-lint', function () {
  return gulp.src(path.src.sass, {since: gulp.lastRun('scss-lint')})
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(scsslint(config.scsslint));
  //.pipe(reporter.printSummary);
});

gulp.task('jshint', function () {
  return gulp.src(path.src.js)
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(jshint(config.jshint))
    .pipe(jshint.reporter(hint_stylish))
    .pipe(browserSync.stream());
});

gulp.task('eslint', function () {
  return gulp.src(path.src.js)
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(eslint(config.eslint))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(browserSync.stream());
});

gulp.task('pug-watch', gulp.parallel('pug', function () {
  gulp.watch(path.watch.pug, gulp.series('pug'));
}));

gulp.task('compass-watch', gulp.parallel('compass', function () {
  gulp.watch(path.watch.sass, gulp.series('compass'));
}));

gulp.task('sass-watch', gulp.parallel('sass', function () {
  gulp.watch(path.watch.sass, gulp.series('sass'));
}));

gulp.task('scss-lint-watch', gulp.parallel('scss-lint', function () {
  gulp.watch(path.watch.sass, gulp.series('scss-lint'));
}));

function clean_map() {
  return del(['src/{css,js}/*.map']);
}

gulp.task('clean', function (cb) {
  return del(['dist'], cb);
});

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
        "textareamaxlength",
        "touchevents"
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
    //.pipe(size(config.fileSize))
    .pipe(gulp.dest('./'));
});

gulp.task('zip-all', function () {
  return gulp.src([
    'css/**',
    'fonts/**',
    'img/**',
    'pug/**',
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
    //.pipe(size(config.fileSize))
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

gulp.task('default', gulp.parallel('server', function () {
  gulp.watch(path.watch.pug, gulp.series('pug'));
  //gulp.watch(path.watch.sass, gulp.series('compass'));
  gulp.watch(path.watch.sass, gulp.series('sass'));
  gulp.watch(path.watch.sass, gulp.series('scss-lint'));
  gulp.watch(path.watch.js, gulp.series('jshint'));
  gulp.watch(path.watch.sprite, gulp.series('sprite'));
  gulp.watch(path.watch.svg, gulp.series('svg'));
  gulp.watch(path.watch.html, gulp.series('html-hint'));
}));