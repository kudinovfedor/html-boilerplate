'use strict';

// Variable
const projectName = 'fk-template';
const src = 'src';
const dist = 'dist';
const favicon_data = `${src}/faviconData.json`;
const ftp_config = JSON.parse(fs.readFileSync(`${src}/ftp.json`));

// Gulp
import gulp from 'gulp';
import gutil from 'gulp-util';
// System
import fs from 'fs';
import {deleteSync as del} from 'del';
// Pug (Jade)
import pug from 'gulp-pug';
// CSS
// import gcmq from 'gulp-group-css-media-queries';
import cssBase64 from 'gulp-css-base64';
import autoprefixer from 'gulp-autoprefixer';
import cleancss from 'gulp-clean-css';
// import {stream as critical} from 'critical';

// SCSS
import sassPackage from 'sass';
import gulpSass from 'gulp-sass';
import sassLint from 'gulp-sass-lint';

const sass = gulpSass(sassPackage);
// Images
import imagemin from 'gulp-imagemin';
import spritesmith from 'gulp.spritesmith';
// Favicon.ico
import realFavicon from 'gulp-real-favicon';
// SVG
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import raster from 'gulp-raster';
// JavaScript
import jshint from 'gulp-jshint';
import hint_stylish from 'jshint-stylish';
import eslint from 'gulp-eslint';
import uglify from 'gulp-uglify';
import autopolyfiller from 'gulp-autopolyfiller';
// Gulp useful plugins
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import notify from 'gulp-notify';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import size from 'gulp-size';
import cache from 'gulp-cache';
import babel from 'gulp-babel';
import zip from 'gulp-zip';
// Browsersync
import gulpBrowserSync from 'browser-sync';

const browserSync = gulpBrowserSync.create();
const reload = browserSync.reload;
// Modernizr
import modernizr from 'gulp-modernizr';
// FTP
import ftp from 'vinyl-ftp';

// Config
const config = {
    // Config Pug (Jade)
    pug: {pretty: true},
    // Config CSS Autoprefixer
    autoprefixer: {
        browsers: ['last 2 versions'],
        cascade: false, add: true, remove: false
    },
    // Config CSS base64
    cssBase64: {
        baseDir: '../img/', maxWeightResource: 10 * 1024, // 10Kb
        extensionsAllowed: ['.svg', '.png', '.jpg', '.gif'] // base64:skip
    },
    // Config CSS minify
    cleancss: {compatibility: 'ie7', format: false, level: 1}, // format: beautify, keep-breaks; level: 0, 1, 2
    // Config SCSS(SASS)
    sass: {
        includePaths: [`${src}/sass/`],
        indentType: 'space',
        indentWidth: 2,
        linefeed: 'crlf',
        outputStyle: 'expanded', // nested, expanded, compact, compressed
        precision: 5,
        sourceComments: false
    },
    // Config SCSS(SASS) Lint
    sassLint: {configFile: `${src}/.sass-lint.yml`},
    // Config img
    sprite: {
        imgName: 'sprite.png', cssName: '_gulp-sprite.scss', imgPath: '../img/sprite.png',
        padding: 1, algorithm: 'binary-tree', cssFormat: 'scss',
        cssVarMap: sprite => {
            sprite.name = `s-${sprite.name}`;
        }, cssTemplate: `${src}/scss.template.handlebars`,
        cssOpts: {
            cssSelector: sprite => `.icon-${sprite.name}`
        }
    },
    // Config Uglify
    uglify: {mangle: false, compress: false},
    // Config JSHint
    jshint: {lookup: true, linter: 'jshint'},
    // Config ESLint
    eslint: {configFile: `${src}/.eslintrc.json`},
    // Config BrowserSync
    bs: {
        server: {baseDir: src},
        //proxy: `hostname/${src}`,
        ui: false, port: 8080, ghostMode: {clicks: false, forms: false, scroll: false},
        logLevel: 'info', logPrefix: 'BrowserSync', logFileChanges: true, online: false,
        reloadOnRestart: true, notify: true
    },
    // Config Gulp file size
    fileSize: {title: 'The size', gzip: false, pretty: true, showFiles: true, showTotal: true},
    // Config Gulp zip
    zip: {compress: true},
};

// Path
const path = {
    src: {
        html: `${src}/*.html`,
        pug: `${src}/pug/*.pug`,
        css: [`${src}/css/*.css`, `!${src}/css/*.min.css`],
        sass: `${src}/sass/**/*.scss`,
        sassLint: [`${src}/sass/**/*.scss`, `!${src}/sass/vendors/**/*.scss`],
        sprite: `${src}/img/sprite/*.*`,
        img: [`${src}/img/**/*.+(png|jpg|jpeg|gif|svg)`, `!${src}/img/optimized/**/*.*`],
        favicon: `${src}/img`,
        svg: `${src}/img/svg/*.svg`,
        js: `${src}/js/common.js`,
        babel: `${src}/js/es6/**/*.js`,
        ie8: [`${src}/js/libs/{html5shiv,respond}.min.js`],
        allJS: [`${src}/js/libs/{modernizr,jquery}.min.js`],
        zip: ['dist/**/{*,}.*', 'src/**/{*,}.*', '{*,}.*', '!*.{zip,rar}', '!.{git,idea,sass-cache}', '!{bower_components,node_modules}']
    },
    dest: {
        pug: src,
        css: `${src}/css`,
        sass: `${src}/css`,
        img: `${src}/img/optimized`,
        favicon: `${src}/img/favicon`,
        sprite: `${src}/img`,
        sprite_css: `${src}/sass/module`,
        svg: `${src}/img`,
        svgfallback: `${src}/img/sprite`,
        js: `${src}/js`,
        babel: `${src}/js/es5`,
        libs: `${src}/js/libs`,
        zip: './'
    },
    watch: {
        html: `${src}/**/*.html`,
        pug: `${src}/pug/**/*.pug`,
        img: `${src}/img/**/*.+(png|jpg|jpeg|gif|svg)`,
        sprite: `${src}/img/sprite/*.*`,
        svg: `${src}/img/svg/*.svg`,
        css: [`${src}/css/*.css`, `!${src}/css/*.min.css`],
        sass: `${src}/sass/**/*.scss`,
        js: `${src}/**/*.js`,
        babel: `${src}/js/es6/**/*.js`
    },
    dist: {
        src: {
            css: `${src}/css/*.css`,
            fonts: `${src}/fonts/**/*.*`,
            img: [`${src}/img/**/*.+(png|jpg|gif|svg)`, `!${src}/img/{sprite,svg,original}/**/*.*`, `!${src}/img/{layout-home,favicon}.{jpg,png}`],
            js: [`${src}/js/**/*.js`, `!${src}/js/**/jquery.pixlayout.min.js`],
            html: `${src}/*.html`,
            other: [`${src}/+(favicon|robots).+(ico|txt)`, '.htaccess'],
            zip: [`${dist}/**/{*,}.*`]
        },
        dest: {
            html: dist,
            css: `${dist}/css`,
            fonts: `${dist}/fonts`,
            img: `${dist}/img`,
            js: `${dist}/js`,
            zip: './'
        }
    }
};

const errorAlert = function (error) {
    notify.onError({title: 'Gulp Error', subtitle: 'Failure!', message: 'Check your terminal', sound: 'Sosumi'})(error);
    gutil.log(gutil.colors.red(`Error (${error.plugin}): ${error.message}`));
    this.emit('end');
};

const getFullDate = () => {
    const d = new Date(),
        year = d.getFullYear(),
        month = d.getMonth() < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1,
        date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate(),
        hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours(),
        minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    return `${date}-${month}-${year}__${hours}.${minutes}`;
};

gulp.task('server', () => {
    browserSync.init(config.bs);
});

gulp.task('svg-sprite', () => {
    return gulp.src(path.src.svg)
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(svgmin({js2svg: {pretty: false}}))
        .pipe(svgstore({inlineSvg: true}))
        .pipe(rename({basename: 'sprite', extname: '.svg'}))
        .pipe(gulp.dest(path.dest.svg));
});

gulp.task('svg-to-png', () => {
    return gulp.src(path.src.svg)
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(raster({format: 'png', scale: 1}))
        .pipe(rename({extname: '.png'}))
        .pipe(gulp.dest(path.dest.svgfallback));
});

gulp.task('img-sprite', () => {
    const spriteData =
        gulp.src(path.src.sprite)
            .pipe(spritesmith(config.sprite));
    spriteData.img.pipe(gulp.dest(path.dest.sprite));
    return spriteData.css.pipe(gulp.dest(path.dest.sprite_css));
});

gulp.task('libs', () => {
    return gulp.src([
        'node_modules/html5shiv/dist/html5shiv.min.js',
        'node_modules/ion-rangeslider/js/ion.rangeSlider.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/jquery-form-styler/dist/jquery.formstyler.min.js',
        'node_modules/jquery-validation/dist/jquery.validate.min.js',
        'node_modules/mmenu-js/dist/mmenu.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
        'node_modules/pixlayout/jquery.pixlayout.min.js',
        'node_modules/respond.js/dest/respond.min.js',
        'node_modules/slick-carousel/slick/slick.min.js',
    ])
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(gulp.dest(path.dest.libs));
});

gulp.task('ie8', () => {
    return gulp.src(path.src.ie8)
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(concat('ie8.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(size(config.fileSize))
        .pipe(gulp.dest(path.dest.js));
});

gulp.task('all-js', () => {
    return gulp.src(path.src.allJS)
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(concat('all.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(size(config.fileSize))
        .pipe(gulp.dest(path.dest.js));
});

gulp.task('pug', () => {
    return gulp.src(path.src.pug)
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(pug(config.pug))
        .pipe(gulp.dest(path.dest.pug))
        .pipe(browserSync.stream());
});

gulp.task('sass', () => {
    return gulp.src(path.src.sass)
        .pipe(plumber({errorHandler: errorAlert}))
        //.pipe(sourcemaps.init())
        .pipe(sass(config.sass).on('error', sass.logError))
        .pipe(autoprefixer(config.autoprefixer))
        //.pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(path.dest.sass))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('css', () => {
    return gulp.src(path.src.css)
        .pipe(plumber({errorHandler: errorAlert}))
        //.pipe(sourcemaps.init())
        //.pipe(autoprefixer(config.autoprefixer))
        //.pipe(gcmq())
        .pipe(cssBase64(config.cssBase64))
        .pipe(cleancss(config.cleancss))
        .pipe(rename({suffix: '.min'}))
        //.pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(path.dest.css));
});

// Generate & Inline Critical-path CSS
gulp.task('critical', () => {
    return gulp.src(path.src.html)
        .pipe(critical({
            base: src,
            inline: false,
            minify: true,
            css: [`${src}/css/main.css`]
        }))
        .pipe(rename({basename: 'critical', suffix: '.min'}))
        .pipe(gulp.dest(path.dest.css));
});

gulp.task('jshint-eslint', () => {
    return gulp.src(path.src.js)
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(jshint(config.jshint))
        .pipe(jshint.reporter(hint_stylish))
        .pipe(eslint(config.eslint))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(browserSync.stream());
});

gulp.task('js', gulp.series('jshint-eslint', () => {
    return gulp.src(path.src.js)
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(autopolyfiller('polyfills.js'))
        //.pipe(sourcemaps.init())
        //.pipe(uglify()) // uncomment for good optimize js
        .pipe(uglify(config.uglify)) // custom settings
        .pipe(rename({suffix: '.min'}))
        //.pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(path.dest.js));
}));

gulp.task('babel', () => {
    return gulp.src(path.src.babel)
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(babel())
        .pipe(gulp.dest(path.dest.babel));
});

gulp.task('img', () => {
    return gulp.src(path.src.img, {since: gulp.lastRun('img')})
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(cache(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.svgo({plugins: [{removeViewBox: false}]})
        ], {
            verbose: true
        })))
        .pipe(gulp.dest(path.dest.img));
});

gulp.task('autoprefixer', () => {
    return gulp.src(['css/main.css'])
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(gulp.dest(path.dest.css));
});

gulp.task('sass-lint', () => {
    return gulp.src(path.src.sassLint)
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(sassLint(config.sassLint))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task('pug:watch', gulp.parallel('pug', () => {
    gulp.watch(path.watch.pug, gulp.series('pug'));
}));

gulp.task('html:watch', gulp.parallel('server', () => {
    gulp.watch(path.watch.html).on('change', reload);
}));

gulp.task('sass:watch', gulp.parallel('sass', () => {
    gulp.watch(path.watch.sass, gulp.series('sass'));
}));

gulp.task('sass-lint:watch', gulp.parallel('sass-lint', () => {
    gulp.watch(path.watch.sass, gulp.series('sass-lint'));
}));

gulp.task('watch', gulp.parallel('pug', 'sass', () => {
    gulp.watch(path.watch.pug, gulp.series('pug'));
    gulp.watch(path.watch.sass, gulp.series('sass'));
}));

gulp.task('modernizr', () => {
    return gulp.src(path.src.js)
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(modernizr('modernizr.js', {
            'devFile': false,
            //"dest": "libs/modernizr.js",
            'crawl': false,
            'uglify': false,
            'useBuffers': false,
            'customTests': [],
            'tests': [
                'svg',
                'touchevents',
                'backdropfilter',
                'csscalc',
                'cssfilters',
                'cssvhunit',
                'cssvmaxunit',
                'cssvminunit',
                'cssvwunit',
                'csscolumns',
                'flexbox',
                'placeholder'
            ],
            'options': [
                'domPrefixes',
                'prefixes',
                'addTest',
                'atRule',
                'hasEvent',
                'mq',
                'prefixed',
                'prefixedCSS',
                'prefixedCSSValue',
                'testAllProps',
                'testProp',
                'testStyles',
                //"html5printshiv",
                //"html5shiv",
                'setClasses'
            ]
        }))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.dest.libs));
});

gulp.task('zip', () => {
    return gulp.src(path.src.zip, {base: '.'})
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(zip(`${projectName}(${getFullDate()}).zip`, config.zip))
        .pipe(size(config.fileSize))
        .pipe(gulp.dest(path.dest.zip));
});

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', (done) => {
    realFavicon.generateFavicon({
        masterPicture: `${path.src.favicon}/favicon.png`, // 310x310 px
        dest: path.dest.favicon.toString(),
        iconsPath: 'img/favicon',
        design: {
            ios: {
                pictureAspect: 'backgroundAndMargin',
                backgroundColor: '#ffffff',
                margin: '14%',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                },
                appName: 'JoomPress'
            },
            desktopBrowser: {},
            windows: {
                pictureAspect: 'whiteSilhouette',
                backgroundColor: '#da532c',
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                        small: false,
                        medium: true,
                        big: false,
                        rectangle: false
                    }
                },
                appName: 'JoomPress'
            },
            androidChrome: {
                pictureAspect: 'noChange',
                themeColor: '#ffffff',
                manifest: {
                    name: 'JoomPress',
                    startUrl: 'https://joompress.biz',
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            },
            safariPinnedTab: {
                pictureAspect: 'silhouette',
                themeColor: '#ff6347'
            }
        },
        settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false,
            readmeFile: true,
            htmlCodeFile: true,
            usePathAsIs: false
        },
        markupFile: favicon_data
    }, () => {
        done();
    });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', () => {
    return gulp.src(`${src}/favicon.html`) // List of the HTML files where to inject favicon markups
        .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(favicon_data)).favicon.html_code))
        .pipe(gulp.dest(src)); // Path to the directory where to store the HTML files
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', (done) => {
    const currentVersion = JSON.parse(fs.readFileSync(favicon_data)).version;
    realFavicon.checkForUpdates(currentVersion, (err) => {
        if (err) {
            throw err;
        }
    });
    done();
});

// Distribute functions
const cleanDist = () => del(path.dist.dest.html);

const cssDist = () => {
    return gulp.src(path.dist.src.css)
        .pipe(gulp.dest(path.dist.dest.css));
};

const fontsDist = () => {
    return gulp.src(path.dist.src.fonts)
        .pipe(gulp.dest(path.dist.dest.fonts));
};

const imgDist = () => {
    return gulp.src(path.dist.src.img)
        .pipe(gulp.dest(path.dist.dest.img));
};

const jsDist = () => {
    return gulp.src(path.dist.src.js)
        .pipe(gulp.dest(path.dist.dest.js));
};

const htmlDist = () => {
    return gulp.src(path.dist.src.html)
        .pipe(gulp.dest(path.dist.dest.html));
};

const otherDist = () => {
    return gulp.src(path.dist.src.other)
        .pipe(gulp.dest(path.dist.dest.html));
};

const zipDist = () => {
    return gulp.src(path.dist.src.zip, {base: '.'})
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(zip(`${projectName}__dist(${getFullDate()}).zip`, config.zip))
        .pipe(size(config.fileSize))
        .pipe(gulp.dest(path.dist.dest.zip));
};
// End Distribute functions

gulp.task('dist', gulp.series(cleanDist, gulp.parallel(cssDist, fontsDist, imgDist, jsDist, htmlDist, otherDist), zipDist));

gulp.task('deploy', gulp.series('dist', () => {
    const ftpConnection = ftp.create({
        host: ftp_config.host, // FTP host, default is localhost
        user: ftp_config.user, // FTP user, default is anonymous
        password: ftp_config.password, // FTP password, default is anonymous@
        port: 21, // FTP port, default is 21
        log: gutil.log, // Log function
        parallel: 10, // Number of parallel transfers, default is 3
    });
    // using base = '.' default is will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance
    return gulp.src(path.dist.src.zip, {base: './dist', buffer: false})
        .pipe(ftpConnection.newer(`/${projectName}`)) // only upload newer files
        .pipe(ftpConnection.dest(`/${projectName}`));
}));

gulp.task('build', gulp.series('deploy', cleanDist));

gulp.task('svg', gulp.series('svg-sprite', 'svg-to-png', 'img-sprite'));

gulp.task('collect-js-files', gulp.series(gulp.parallel('libs', 'modernizr'), gulp.parallel('ie8', 'all-js')));

gulp.task('default', gulp.parallel('server', () => {
    gulp.watch(path.watch.pug, gulp.series('pug'));
    gulp.watch(path.watch.sass, gulp.series('sass'));
    gulp.watch(path.watch.babel, gulp.series('babel'));
    gulp.watch(path.watch.sprite, gulp.series('img-sprite'));
    gulp.watch(path.watch.svg, gulp.series('svg'));
    gulp.watch(path.watch.css).on('change', reload);
    gulp.watch(path.watch.js).on('change', reload);
    gulp.watch(path.watch.html).on('change', reload);
}));
