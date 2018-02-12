/*
=====================================
require plugin
=====================================
*/
var gulp = require('gulp'),
    $ = require("gulp-load-plugins")(),
    browserSync = require('browser-sync').create();

/*
=====================================
add folder
=====================================
*/
//folder to develop
var develop = './public-html/';

/*
=====================================
glup task
=====================================
*/
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: develop
        }
    });
});

gulp.task('watch',function(){
  gulp.watch(develop+'src/sass/**/*.scss', ['sass']);
  gulp.watch(develop+'src/js/**/*.js', ['js']);
  gulp.watch(develop+'*.html').on('change', browserSync.reload);
});

gulp.task('images', function() {
  gulp.src(develop+'src/images/**/*')
    .pipe($.plumber({
      errorHandler: $.notify.onError('Error: <%= error.message %>')
    }))
    .pipe($.changed(develop+'images/'))
    .pipe($.imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(develop+'images/'))
});

gulp.task('js', function() {
  gulp.src(develop+'src/js/**/*.js')
    .pipe($.plumber({
      errorHandler: $.notify.onError('Error: <%= error.message %>')
    }))
    .pipe($.uglify())
    .pipe(gulp.dest(develop+'js/'))
});

gulp.task('sass', ['images'], function(){
  gulp.src(develop+'src/sass/**/*.scss')
    .pipe($.plumber({
      errorHandler: $.notify.onError('Error: <%= error.message %>')
    }))
    .pipe($.sass())
    .pipe($.autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9', 'Android >= 4', 'ios_saf >= 8'],
        cascade: false
    }))
    .pipe($.csscomb())
    .pipe($.groupCssMediaQueries())
    .pipe($.cleanCss())
    .pipe(gulp.dest(develop+'css/'))
    .pipe(browserSync.stream())
});

// run all tasks
gulp.task('run', ['js', 'sass']);

// default task
gulp.task('default', ['browser-sync', 'watch', 'run']);
