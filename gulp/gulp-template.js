(function(){
    'use strict';

    var gulp     = require('gulp'),
        gutil    = require('gulp-util'),
        plumber  = require('gulp-plumber'),
        jade     = require('gulp-jade');

    var paths = require('../gulp/gulp-paths.js');

    gulp.task( 'jade', function() {
        return gulp.src(paths.dev.html, {
            base     : './app',
            views    : './app/views/',
            partials : './app/partials/'
        })
            .pipe( plumber() )
            .pipe( jade({
                pretty: true
            }))
            .pipe( gulp.dest( paths.app ) );
    });

}());
