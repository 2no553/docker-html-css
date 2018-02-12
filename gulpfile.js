/*
=====================================
使用プラグイン（モジュールのロード）
=====================================
*/
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');
/*


=====================================
各ファイルのフォルダ指定
=====================================
*/
//Folder to develop -> 開発フォルダ
var develop = "public-html/";


/*
=====================================
glup task
=====================================
*/

//sassコンパイル
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
});


//glup実行
gulp.task('default', [ 'sass' ]);
