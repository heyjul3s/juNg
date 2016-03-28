(function(){
    'use strict';

    var gulp            = require('gulp'),
        plumber         = require('gulp-plumber'),
        gulpif          = require('gulp-if'),
        extend          = require('extend'),
        parseArgs       = require('minimist'),
        stylus          = require('gulp-stylus'),
        nib             = require('nib'),
        jeet            = require('jeet'),
        rupture         = require('rupture'),
        typographic     = require('typographic'),
        autoprefixer    = require('gulp-autoprefixer'),
        cachebust       = require('gulp-cachebust'),
        concat          = require('gulp-concat'),
        cssmin          = require('gulp-cssmin'),
        //Gulp file import
        paths           = require('../gulp/gulp-paths.js'),
        config          = require('../gulp/gulp-config.js');


    gulp.task('autoprefixer', function(){
        return gulp.src( paths.dev.css )
            .pipe( plumber() )
            .pipe( autoprefixer([
                'last 2 versions',
                '> 1%',
                'ie 10'
            ]))
            .pipe( gulp.dest(paths.dist.base) );
    });


    //Stylus
    gulp.task('stylus', function(){
        return gulp.src( paths.dev.css, {
            'views'    : './app/views/',
            'partials' : './app/partials/'
        })
            .pipe( plumber() )
            .pipe( stylus({

            paths: [
                'node_modules',
                paths.dev.css[0],
                paths.dev.css[1]
            ],

            import: [
                'jeet/stylus/jeet',
                'nib',
                'rupture/rupture',
            ],

            use: [
                nib(),
                typographic(),
                rupture(),
                jeet()
            ],

            'include css': true

        }))
        .pipe( autoprefixer() )
        .pipe( gulpif( config.env === 'prod', cssmin() ) )
        .pipe( gulpif( config.env === 'prod', concat('production.min.css'), concat('production.css') ) )
        .pipe( gulp.dest( paths.dist.base ) );
    });
}());
