/* VARIABLES ---------------------------
-----------------------------------------------*/

// VARIABLES DEPENDENCIES ---------------------------------------------------------

const { src, dest, parallel, watch } = require('gulp');
const htmlmin             =     require('gulp-htmlmin');
const fileinclude         =     require('gulp-file-include');
const sass                =     require('gulp-sass');
const autoprefixer        =     require('gulp-autoprefixer');
const cleanCSS            = 	require('gulp-clean-css');
const plumber             = 	require('gulp-plumber');
const notify              = 	require("gulp-notify");
const { init, reload }    =     require("browser-sync");
const babel               =     require('gulp-babel');
const xo                  =     require('gulp-xo');
const rename              =     require("gulp-rename");

// VARIABLES PATH ------------------------------------------------------------------

const scssSource          =   'src/css/scss/**/*.scss';
const htmlSource          =   'src/*.html';
const jsSource            =   'src/js/*.js';
const buildSource         =   'build';

/* FUNCTIONS ---------------------------
-----------------------------------------------*/

function cssProcess() {
  return src (scssSource, {sourcemaps: true})
    .pipe(plumber({errorHandler: notify.onError("Erreur: <%= error.message %>")}))
    .pipe(sass())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(autoprefixer({
            browsers: ['> 0.2%', 'not dead'],
            cascade: false
        }))
    .pipe(rename(function(path){
      path.basename += ".min";
    }))
    .pipe(dest(buildSource+'/css', {sourcemaps: '.'}));
}

function jsProcess () {
  return src(jsSource)
    .pipe(plumber({errorHandler: notify.onError("Erreur: <%= error.message %>")}))
    .pipe(xo())
    .pipe(xo.format())
    .pipe(
        babel({
            presets: ['@babel/env'],
        })
    )
    .pipe(dest(buildSource+'/js'));
}

function htmlProcess() {
  return src(htmlSource)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(dest(buildSource));
}

function sync() {
    init({
        browser: 'chrome',
        server: {
            baseDir: buildSource
        }
    });
}

/* LAUNCH TASKS ---------------------------
-----------------------------------------------*/

function watcher() {
  watch(scssSource, cssProcess);
  watch(jsSource, jsProcess);
  watch(htmlSource, htmlProcess);
  watch(buildSource+'/*.html').on('change', reload);
  watch(buildSource+'/css/*.css').on('change', reload);
  watch(buildSource+'/js/*.js').on('change', reload);
}

const observe = parallel(sync, htmlProcess, cssProcess, jsProcess, watcher );

module.exports = { default: observe, cssProcess, observe, sync, watcher, htmlProcess, jsProcess };
