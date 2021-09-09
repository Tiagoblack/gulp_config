'use strict';

const browserSync = require('browser-sync');
var { src, dest, watch, task, parallel } = require('gulp');
var sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browser = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');



function buildStyles() {
    return src('gulp/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            //browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(dest('gulp/css/'))
        .pipe(browserSync.stream())
};


function browserScn() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
}

function gulpJS() {
    return src('gulp/js/main/**/*.js')
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(dest('gulp/js/'))
        .pipe(browserSync.stream())

}

function pluglinsJS() {
    return src(['node_modules/jquery/dist/jquery.min.js'])
        .pipe(concat('plugins.min.js'))
        .pipe(dest('gulp/js/'))
        .pipe(browserSync.stream())
}
exports.gulpJS = gulpJS;
exports.pluglinsJS = pluglinsJS;

exports.buildStyles = buildStyles;


function runWacth() {
    watch('gulp/scss/**/*.scss', buildStyles);
    watch('*.html').on('change', browserSync.reload);
    watch('gulp/js/main/*.js', gulpJS);
    watch('gulp/js/index.js', pluglinsJS)
}

task('default', parallel(browserScn, runWacth, gulpJS, pluglinsJS));
//xports.default = parallel(browserScn, rodar);