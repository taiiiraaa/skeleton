"use strict";
var gulp = require('gulp');

//----------------------------
//  Sass compile
//----------------------------

var sass = require('gulp-sass');

gulp.task('sass', function(){
    gulp.src('./public_html/css/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public_html/css'));
});

// start sass watch process
gulp.task('sass:watch', function(){
    gulp.watch('./public_html/css/sass/*.scss', ['sass']);
});


//-----------------------------
// CSS/Sass Autoprefixer
//-----------------------------

var autoprefixer = require('gulp-autoprefixer');

gulp.task('css:prefix', function () {
    return gulp.src('public_html/css/sass/_style.scss')
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public_html/css/sass/'));
});


//----------------------------
//  Image optimise
//----------------------------

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('image:opti', function () {
    return gulp.src(['public_html/img/original/**/*.jpg', 'public_html/img/original/**/*.png'])
        .pipe(imagemin({
            optimizationLevel:7,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('public_html/img/optimised/'));
});


//------------------------------------------
//  Javascript file concatenate and minify
//-----------------------------------------

var concat = require('gulp-concat');
var uglyfly = require('gulp-uglyfly');

gulp.task('js:min', function() {
  return gulp.src([
      'public_html/js/vendor/googlemaps-js-map-label.js',
      'public_html/js/vendor/geolocationmarker-compiled.js',
      'public_html/js/helper.js',
      'public_html/js/slide-in-container.js',
      'public_html/js/map-data.js'
  ])
    .pipe(concat('main.js'))
    .pipe(uglyfly({mangle:false})) // minify
    .pipe(gulp.dest('public_html/js/'));
});


//------------------------------------------
//  Javascript file minify
//-----------------------------------------

//var uglyfly = require('gulp-uglyfly');
//
// gulp.task('js:min', function() {
//  gulp.src('public_html/js/main.js')
//    .pipe(uglyfly({mangle:false}))
//    .pipe(gulp.dest('public_html/js/'));
//});


gulp.task('default', function() {
    gulp.start('sass', 'css:prefix', 'image:opti', 'js:min');
});
