const gulp = require('gulp');
const util = require('gulp-util');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglifyjs');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const log = util.log;

const input = ['.././TicTacToe.Web/TicTacToe/**/*.scss'];
const output = './wwwroot/css/';
const inputJs = ['./TAMOIL/Extranet/Scripts/Helpers/**/*.js', './TAMOIL/Extranet/Modules/**/*.js'];
const outputJs = './TicTacToe.Web/wwwroot/js';
const inputSassWatch = ['./TicTacToe.Web/**/*.scss'];
const thirdPartyJs = [];



gulp.task('sass', function () {
    console.log(input);
    return gulp.src(input)
        .pipe(util.env.env === 'prod' ? util.noop() : sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(util.env.env === 'prod' ? cleanCSS() : sourcemaps.write())
        .pipe(gulp.dest(output));
});


gulp.task('js', function () {
    return gulp.src(inputJs)
        .pipe(util.env.env === 'prod' ? util.noop() : sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(util.env.env === 'prod' ? uglify() : sourcemaps.write())
        .pipe(gulp.dest(outputJs));
});

gulp.task('thirdpartyjs', function () {
    return gulp.src(thirdPartyJs)
        .pipe(util.env.env === 'prod' ? util.noop() : sourcemaps.init())
        .pipe(concat('thirdparty.js'))
        .pipe(util.env.env === 'prod' ? util.noop() : sourcemaps.write())
        .pipe(gulp.dest(outputJs));
});

gulp.task('watch', function () {
    return gulp
        .watch(inputSassWatch, ['sass'])
        .on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('watchJs', function () {
    return gulp
        .watch(inputJs, ['js'])
        .on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});


gulp.task('default', ['build', 'watch', 'watchJs']);
gulp.task('build', ['sass', 'js', 'thirdpartyjs']);