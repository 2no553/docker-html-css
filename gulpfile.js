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
// default
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
  gulp.watch(src + 'sass/**/*.scss', ['sass']);
  gulp.watch([develop + '*.html', develop+'js/**/*.js']).on('change', browserSync.reload);
});

// build
// images compress
gulp.task('imagemin', function() {
  gulp.src(src + 'images/**/*')
    .pipe($.plumber({
      errorHandler: $.notify.onError('Error: <%= error.message %>')
    }))
    .pipe($.changed(develop + 'images/'))
    .pipe($.imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(develop + 'images/'))
});

// ejs compile
gulp.task('ejs', ['imagemin'], function(){
  gulp.src([src + 'ejs/**/*.ejs', '!' + src + 'ejs/_module/_*.ejs'])
    .pipe($.plumber({
      errorHandler: $.notify.onError('Error: <%= error.message %>')
    }))
    .pipe($.ejs({}, {}, { ext: '.html' }))
    .pipe(gulp.dest(develop));
});

// sass compile
gulp.task('sass', ['imagemin'], function(){
  gulp.src([src + 'sass/**/*.scss', '!' + src + 'sass/**/_*.scss'])
    .pipe($.plumber({
      errorHandler: $.notify.onError('Error: <%= error.message %>')
    }))
    .pipe($.stylint())
    .pipe($.stylint.reporter())
    .pipe($.sassGlob())
    .pipe($.sass())
    .pipe($.autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9', 'Android >= 4', 'ios_saf >= 8'],
        cascade: false
    }))
    .pipe($.csscomb())
    .pipe($.groupCssMediaQueries())
    .pipe(gulp.dest(develop + 'css/'))
    .pipe(browserSync.stream())
});

// html lint
gulp.task('htmlhint', ['ejs'], function(){
  gulp.src(develop + '*.html')
    .pipe($.plumber({
      errorHandler: $.notify.onError('Error: <%= error.message %>')
    }))
    .pipe($.htmlhint(develop +'htmlhintrc'))
    .pipe($.htmlhint.reporter())
});

// js lint
gulp.task('eslint', function() {
  gulp.src(src + 'js/**/*.js')
    .pipe($.plumber({
      errorHandler: $.notify.onError('Error: <%= error.message %>')
    }))
    .pipe($.eslint({
      useEslintrc: true
    }))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError())
    .pipe(gulp.dest(develop + 'js/'))
});

// deploy
// js minify
gulp.task('uglify', function() {
  gulp.src(develop + 'js/**/*.js')
    .pipe($.plumber({
      errorHandler: $.notify.onError('Error: <%= error.message %>')
    }))
    .pipe($.uglify())
    .pipe(gulp.dest(develop + 'js/'))
});

// css minify
gulp.task('cleanCss', function() {
  gulp.src(develop + 'css/**/*.css')
    .pipe($.plumber({
      errorHandler: $.notify.onError('Error: <%= error.message %>')
    }))
    .pipe($.cleanCss())
    .pipe(gulp.dest(develop + 'css/'))
});

// default tasks
gulp.task('default', ['browser-sync', 'watch']);
// build tasks
gulp.task('build', ['sass', 'htmlhint', 'eslint']);
// build and deploy tasks
gulp.task('deploy', ['uglify', 'cleanCss']);
