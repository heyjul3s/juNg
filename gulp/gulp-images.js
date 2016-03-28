(function(){
    'use strict';

    var gulp      = require('gulp'),
        gutil     = require('gulp-util'),
        imageMin  = require('gulp-imagemin'),
        //Gulp file import
        paths     = require('../gulp/gulp-paths.js');

    gulp.task('image-min', function(){
        return gulp.src(paths.img)
            .pipe(imageMin({
                progressive: true
            }))
            .pipe( gulp.dest(paths.dist.img) );
    });

}());
