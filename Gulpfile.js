(function(){
    'use strict';

    var gulp            = require('gulp'),
        plumber         = require('gulp-plumber'),
        gutil           = require('gulp-util'),
        requireDir      = require('require-dir'),
        extend          = require('extend'),
        runSequence     = require('run-sequence'),
        gulpif          = require('gulp-if'),
        parseArgs       = require('minimist'),
        watch           = require('gulp-watch'),
        //Gulp file includes
        paths           = require('./gulp/gulp-paths.js'),
        config          = require('./gulp/gulp-config.js');

    requireDir('./gulp');

    gulp.task('set-dev-node-env', function() {
       return process.env.NODE_ENV = config.env = 'dev';
    });


    gulp.task('set-prod-node-env', function() {
       return process.env.NODE_ENV = config.env = 'prod';
    });


    gulp.task('watch', function() {
        gulp.watch(paths.watch.html, [
            'jade'
        ]);

        gulp.watch(paths.watch.styles, [
            'stylus',
        ]);

        gulp.watch(paths.watch.js, [
            'jshint',
            'js'
        ]);
    });


    gulp.task('default', [
        'clean',
        'build'
    ]);


    gulp.task('build', [
        'clean',
        'jade',
        'stylus',
        'autoprefixer',
        'js',
        'jshint'
    ]);


    gulp.task('prod-build', [
        'clean',
        'jade',
        'stylus',
        'autoprefixer',
        'js',
        'jshint',
        'image-min'
    ]);


    gulp.task('dev', ['set-dev-node-env'], function() {
       return runSequence(
           'watch',
           'build',
           'serve'
       );
    });


    gulp.task('prod', ['set-prod-node-env'], function() {
       return runSequence(
          'prod-build'
       );
    });

}());
