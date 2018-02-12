/*
=====================================
require plugin
=====================================
*/
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync').create();
/*

=====================================
add folder
=====================================
*/
//folder to develop
var develop = "public-html/";
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
gulp.task('default',function(){
  // watch
  gulp.watch(config.path.beforeCompileSass, ['sass']);
  gulp.watch(develop+'/*.html').on('change', browserSync.reload);

  // Static server
  browserSync.init({
      server: {
          baseDir: "./"+develop
      }
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

  // reloading browsers
  gulp.task('reload',function(){
    browserSync.reload();
  })

});
