const gulp = require('gulp');
const util = require('gulp-util');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglifyjs');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const log = util.log;

const inputScss = ['.././TicTacToe.Web/TicTacToe/**/*.scss'];
const output = './wwwroot/css/';
const inputJs = ['./TAMOIL/Extranet/Scripts/Helpers/**/*.js', './TAMOIL/Extranet/Modules/**/*.js'];
const outputJs = './TicTacToe.Web/wwwroot/js';
const inputSassWatch = ['./TicTacToe.Web/**/*.scss'];
const thirdPartyJs = [];



gulp.task('sass', function () {
    console.log(inputScss);
    return gulp.src(inputScss)
        .pipe(util.env.env === 'prod' ? util.noop() : sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(util.env.env === 'prod' ? cleanCSS() : sourcemaps.write())
        .pipe(concat('main.css'))
        .pipe(gulp.dest(output));
});

gulp.task('js', function () {
    return gulp.src(inputJs)
        .pipe(util.env.env === 'prod' ? util.noop() : sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(util.env.env === 'prod' ? uglify() : sourcemaps.write())
        .pipe(gulp.dest(outputJs));
});

gulp.task('watch', function () {
    return gulp
        .watch(inputScss, ['sass'])
        .on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});


// warum 2 watches?
// gulp.task('watchJs', function () {
//     return gulp
//         .watch(inputJs, ['js'])
//         .on('change', function (event) {
//             console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//         });
// });

//mayber later or use Webpack
// gulp.task('thirdpartyjs', function () {
//     return gulp.src(thirdPartyJs)
//         .pipe(util.env.env === 'prod' ? util.noop() : sourcemaps.init())
//         .pipe(concat('thirdparty.js'))
//         .pipe(util.env.env === 'prod' ? util.noop() : sourcemaps.write())
//         .pipe(gulp.dest(outputJs));
// });



gulp.task('default', ['build', 'watch']);
gulp.task('build', ['sass']);