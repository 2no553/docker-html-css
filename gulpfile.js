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
    browserSync = require('browser-sync').create();
/*

=====================================
add folder
=====================================
*/
//folder to develop
var develop = "public-html/";


/*
=====================================
glup task
=====================================
*/
//default
gulp.task('default',function(){
  // watch
  gulp.watch(develop+'/sass/**/*.scss', ['sass']);
  gulp.watch(develop+"/*.html", ['reload']);

  // Static server
  browserSync.init({
      server: {
          baseDir: "./"+develop
      }
  });

  //sass compile
  gulp.task('sass', function(){
    gulp.src(develop+'/sass/**/*.scss')
      .pipe(plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      }))
      .pipe(sass())
      .pipe(autoprefixer({
          browsers: ['last 2 versions', 'ie >= 9', 'Android >= 4', 'ios_saf >= 8'],
          cascade: false
      }))
      .pipe(gulp.dest(develop+'/css'))
      .pipe(browserSync.stream())
  });

  // reloading browsers
  gulp.task('reload',function(){
    browserSync.reload();
  })

});
