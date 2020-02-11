/* VARIABLES ---------------------------
-----------------------------------------------*/

// VARIABLES DEPENDENCIES ---------------------------------------------------------

const { src, dest, parallel, watch } = require('gulp');
const htmlmin               =   require('gulp-htmlmin');
const fileinclude           =   require('gulp-file-include');
const postcss               =   require('gulp-postcss');
const sourcemaps            =   require('gulp-sourcemaps');
const processImportcss      =   require('precss');
// const partialimport         =   require('postcss-partial-import');
// const partialimport         =   require('postcss-easy-import');
// const partialimport         =   require('postcss-import');
const processcss            =   require('postcss-advanced-variables');
const pxtorem               =   require('postcss-pxtorem');
const autoprefixer          =   require('autoprefixer');
const hexargba              =   require('postcss-hexrgba');
const svgo                  =   require('postcss-svgo');
const postcssPresetEnv      =   require('postcss-preset-env');
const cssnano               =   require('cssnano');
const cleanCSS              =   require('gulp-clean-css');
const babel                 =   require('gulp-babel');
const xo                    =   require('gulp-xo');
const plumber               = 	require('gulp-plumber');
const notify                = 	require("gulp-notify");
const rename                =   require("gulp-rename");
const { init, reload }      =   require("browser-sync");

// VARIABLES PATH ------------------------------------------------------------------

const styleScss     = 'src/css/scss/style.scss';
const scssSource    = 'src/css/scss/**/*.scss';
const htmlSource    = 'src/*.html';
const jsSource      = 'src/js/*.js';
const buildSource   = 'build';

const cssProcessors = [
    processImportcss,
    // partialimport({prefix:"_",extension:".scss"}),
    // partialimport,
    processcss,
    autoprefixer({
        browsers: ['> 0.2%', 'not dead'],
        cascade: false
    }),
    pxtorem({
        replace: false
    }),
    hexargba,
    svgo,
    postcssPresetEnv,
    cssnano
];

/* FUNCTIONS ---------------------------
-----------------------------------------------*/

function cssProcess() {
    return src (styleScss, {sourcemaps: true})
        .pipe(plumber({errorHandler: notify.onError("Erreur: <%= error.message %>")}))
        .pipe(postcss(cssProcessors))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename(function(path) {
            path.basename += ".min";
            path.extname = ".css";
        }))
        .pipe(dest(buildSource + '/css', {sourcemaps: '.'}));
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
  watch(buildSource + '/*.html').on('change', reload);
  watch(buildSource + '/css/*.css').on('change', reload);
  watch(buildSource + '/js/*.js').on('change', reload);
}

const observe = parallel(htmlProcess, cssProcess, jsProcess, sync, watcher);

module.exports = { default: observe, htmlProcess, jsProcess, cssProcess, observe, sync, watcher };
