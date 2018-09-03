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

// get the path to any node_modules the project will use
gulp.task('node_modules', function() {
  return gulp.src(
    ['node_modules/vue/dist/vue.js']
  ).pipe(plugin.flatten())
  .pipe(gulp.dest(DEST))
})

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
// move all svg's
gulp.task('svg', function() {
  return gulp.src(ROOT + 'resources/icons/*')
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
        browser: "firefox"
    })
    gulp.watch(DEST + '*').on('change', browserSync.reload)
})

gulp.task('build', gulp.parallel('html-js', 'css', 'node_modules', 'svg'))

gulp.task('dev', gulp.series(
  'build',
  gulp.parallel('watch', 'serve')
))

gulp.task('default', gulp.parallel('dev'))
