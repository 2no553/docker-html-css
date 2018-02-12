/*
=====================================
require plugin
=====================================
*/
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css');
/*

=====================================
add folder
=====================================
*/
//folder to develop
var develop = 'public-html/';
//config path from gulpfile.js
var config = {
	'path' : {
    'beforeCompileSass' : develop+'sass/**/*.scss',
    'afterCompileSass' : develop+'css/',
  }
}

/*
=====================================
glup task
=====================================
*/
//default
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"+develop
        }
    });
});

gulp.task('watch',function(){
  gulp.watch(config.path.beforeCompileSass, ['sass']);
  gulp.watch(develop+'/*.html').on('change', browserSync.reload);

});

//sass compile
gulp.task('sass', function(){
  gulp.src(config.path.beforeCompileSass)
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9', 'Android >= 4', 'ios_saf >= 8'],
        cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.path.afterCompileSass))
    .pipe(browserSync.stream())
});

// default task
gulp.task('default', ['browser-sync', 'watch', 'sass']);
