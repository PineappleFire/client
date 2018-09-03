'use strict'
var gulp = require('gulp')
var plugin = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
})
var browserSync = require('browser-sync').create()

const ROOT = 'app/'
const SITES = ROOT + 'sites/'
const DEST = 'dest/'


// get all html and js files
gulp.task('html-js', function() {
  return gulp.src([SITES + '**/*.html', SITES + '**/*.js'])
    .pipe(plugin.flatten())
    .pipe(gulp.dest(DEST))
})
// get all styl files and compile them
gulp.task('css', function() {
  return gulp.src(SITES + '**/*.styl')
    .pipe(plugin.stylus())
    .pipe(plugin.flatten())
    .pipe(gulp.dest(DEST))
})

// if any of the html, styl or js files change, run the tasks
gulp.task('watch', function() {
  gulp.watch([SITES + '**/*.html', SITES + '**/*.js'], gulp.series('html-js'))
  gulp.watch('app/**/*.styl', gulp.series('css'))
})

// reload the browser if any of the files in the destination folder change
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
