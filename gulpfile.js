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
var develop = './public-html/',
    src = develop+'src/';

/*
=====================================
glup task
=====================================
*/
// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: develop
        }
    });
});

// watch
gulp.task('watch',function(){
  gulp.watch([src + 'ejs/**/*.ejs', src + 'ejs/_module/_*.ejs'], ['ejs']);
  gulp.watch(src + 'js/**/*.js', ['js']);
  gulp.watch(src + 'sass/**/*.scss', ['sass']);
  gulp.watch(develop + '*.html').on('change', browserSync.reload);
});

// images compress
gulp.task('images', function() {
  gulp.src(src + 'images/**/*')
    .pipe($.plumber({
      errorHandler: $.notify.onError('Error: <%= error.message %>')
    }))
    .pipe($.changed(develop + 'images/'))
    .pipe($.imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(develop + 'images/'))
});

// ejs compile
gulp.task('ejs', ['images'], function(){
  gulp.src([src + 'ejs/**/*.ejs', '!' + src + 'ejs/_module/_*.ejs'])
    .pipe($.plumber({
      errorHandler: $.notify.onError('Error: <%= error.message %>')
    }))
    .pipe($.ejs({}, {}, { ext: '.html' }))
    .pipe(gulp.dest(develop));
});

// sass compile
gulp.task('sass', ['images'], function(){
  gulp.src([src + 'sass/**/*.scss', '!' + src + 'sass/**/_*.scss'])
    .pipe($.plumber({
      errorHandler: $.notify.onError('Error: <%= error.message %>')
    }))
    .pipe($.sassGlob())
    .pipe($.sass())
    .pipe($.autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9', 'Android >= 4', 'ios_saf >= 8'],
        cascade: false
    }))
    .pipe($.csscomb())
    .pipe($.groupCssMediaQueries())
    .pipe($.cleanCss())
    .pipe(gulp.dest(develop + 'css/'))
    .pipe(browserSync.stream())
});

// js minify
gulp.task('js', function() {
  gulp.src(src + 'js/**/*.js')
    .pipe($.plumber({
      errorHandler: $.notify.onError('Error: <%= error.message %>')
    }))
    .pipe($.uglify())
    .pipe(gulp.dest(develop + 'js/'))
});

// run all tasks
gulp.task('run', ['ejs', 'sass', 'js']);

// default task
gulp.task('default', ['browser-sync', 'watch', 'run']);
