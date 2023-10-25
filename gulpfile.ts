const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'));
var rename = require('gulp-rename');
// const purgecss = require('gulp-purgecss')


function buildStyles() {
  return src('sass/**/*.scss')
    .pipe(sass())
    .pipe(rename('styles.css'))
    .pipe(dest('css'))

}

function watchTask() {
  watch(['sass/**/*.scss'], buildStyles)
}

exports.default = series(buildStyles, watchTask)