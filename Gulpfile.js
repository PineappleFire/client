'use strict'
var gulp = require('gulp')
var plugin = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
})
var browserSync = require('browser-sync').create()

const ROOT = 'app/sites/'
const DEST = 'dest/'

gulp.task('html-js', function() {
  return gulp.src([ROOT + '**/*.html', ROOT + '**/*.js'])
    .pipe(plugin.flatten())
    .pipe(gulp.dest(DEST))
})
gulp.task('css', function() {
  return gulp.src(ROOT + '**/*.styl')
    .pipe(plugin.stylus())
    .pipe(plugin.flatten())
    .pipe(gulp.dest(DEST))
})

gulp.task('watch', function() {
  gulp.watch([ROOT + '**/*.html', ROOT + '**/*.js'], gulp.series('html-js'))
  gulp.watch('app/**/*.styl', gulp.series('css'))
})

gulp.task('serve', function() {
    browserSync.init({
        server: { baseDir: DEST },
        browser: "google chrome"
    })
    gulp.watch(DEST + '*').on('change', browserSync.reload)
})

gulp.task('build', gulp.parallel('html-js', 'css'))
gulp.task('dev', gulp.series(
  'build',
  gulp.parallel('watch', 'serve')
))
gulp.task('default', gulp.parallel('dev'))
