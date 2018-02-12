/*
=====================================
require plugin
=====================================
*/
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create(),

    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),

    uglify = require('gulp-uglify'),

    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css');

/*

=====================================
add folder
=====================================
*/
//folder to develop -> srcに変更
var develop = './public-html/';

/*
=====================================
glup task
=====================================
*/
//default
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: develop
        }
    });
});

gulp.task('watch',function(){
  gulp.watch(develop+'sass/**/*.scss', ['sass']);
  gulp.watch(develop+'/*.html').on('change', browserSync.reload);
});

// image processing
gulp.task('images', function() {
  gulp.src(develop+'images/**/*')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(newer(develop+'test/images/'))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(develop+'test/images/'))
});

// js processing
gulp.task('js', function() {
  gulp.src(develop+'js/**/*.js')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(uglify())
    .pipe(gulp.dest(develop+'test/js/'))
});

//sass compile
gulp.task('sass', function(){
  gulp.src(develop+'sass/**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9', 'Android >= 4', 'ios_saf >= 8'],
        cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(develop+'css/'))
    .pipe(browserSync.stream())
});

// default task
gulp.task('default', ['browser-sync', 'watch', 'sass', 'images', 'js']);
