'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function(cb) {
    var called = false;
    return nodemon({
            script: 'server.js',
            watch: ['server.js']
        })
        .on('start', function onStart() {
            if (!called) {
                cb();
            }
            called = true;
        })
        .on('restart', function onRestart() {
            setTimeout(function reload() {
                browserSync.reload({
                    stream: false
                });
            }, BROWSER_SYNC_RELOAD_DELAY);
        });
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync({
        proxy: 'http://localhost:3000',
        port: 4000,
        ws: true,
        open: false
    });
});

gulp.task('js', function() {
    return gulp.src('public/js/**/*.js')
        //.pipe(uglify())
        //.pipe(gulp.dest('...'));
});

gulp.task('css', function() {
    return gulp.src('public/css/**/*.css')
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('bs-reload', function() {
    browserSync.reload();
});

gulp.task('default', ['browser-sync'], function() {
    gulp.watch('public/js/**/*.js', ['js', browserSync.reload]);
    gulp.watch('public/css/**/*.css', ['css']);
    gulp.watch('public/**/*.html', ['bs-reload']);
});
