var gulp = require('gulp');
var browserify = require('browserify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');

var srcDir = './app';
var destDir = './build';

var browserArr = ['Android > 2.3', 'Firefox > 20', 'Chrome > 24'];

gulp.task('html', function() {
  return gulp.src(srcDir + '/*.html')
    .pipe(gulp.dest(destDir));
});

gulp.task('sass', function() {
  return gulp.src(srcDir + '/styles/main.scss')
    .pipe(sass())
    .pipe(autoprefixer({browsers: browserArr, cascade: true}))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(destDir))
    .pipe(livereload());
});

gulp.task('script', function() {
  return browserify({
    entries: [srcDir + '/scripts/main.coffee'],
    extensions: ['.coffee']
  })
  .transform('cjsxify')
    .require('./bower_components/react/react', {expose:'react'})
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest(destDir))
  .pipe(livereload());
});

gulp.task('server', function(next) {
  var connect = require('connect');
  var serveStatic = require('serve-static');
  var server = connect();
  server.use(serveStatic(destDir)).listen(8000, next);
});

gulp.task('default', ['html', 'sass', 'script', 'server'], function() {
  gulp.watch(srcDir + '/styles/*.scss', {maxListeners: 999},
             ['sass']);
  gulp.watch(srcDir + '/scripts/*.coffee', {maxListeners: 999}, ['script']);
});
