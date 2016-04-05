(function(){
    'use strict';

    var gulp            = require('gulp'),
        plumber         = require('gulp-plumber'),
        gutil           = require('gulp-util'),
        gulpif          = require('gulp-if'),
        extend          = require('extend'),
        parseArgs       = require('minimist'),
        jshint          = require('gulp-jshint'),
        stylish         = require('jshint-stylish'),
        browserify      = require('browserify'),
        ngAnnotate      = require('gulp-ng-annotate'),
        bulk            = require('bulk-require'),
        bulkify         = require('bulkify'),
        babelify        = require('babelify'),
        fs              = require('vinyl-fs'),
        buffer          = require('vinyl-buffer'),
        source          = require('vinyl-source-stream'),
        uglify          = require('gulp-uglify'),
        source          = require('gulp-sourcemaps'),
        //Gulp file import
        paths           = require('../gulp/gulp-paths.js'),
        config          = require('../gulp/gulp-config.js');


    var packageJson = require('../package.json'),
        dependencies = Object.keys(packageJson && packageJson.dependencies || {});

    gulp.task('jshint', function(){
        return gulp.src( paths.dev.js )
            .pipe( plumber() )
            .pipe( jshint() )
            .pipe( jshint.reporter(
                stylish
            ));
    });

    //TODO : debug false if production or deployment mode
    gulp.task('js', function () {
        return browserify({
                entries: './app/app.js',
                debug: true
            })
            .transform( bulkify )
            .transform( 'babelify', {
                presets: [ 'es2015' ]
            })
            .bundle()
                .on('error', gutil.log)
                    .pipe( gulpif( config.env === 'prod', source('./production.min.js'), source('./production.js') ) )
                    .pipe( buffer() )
                    .pipe( ngAnnotate() )
                    .pipe( gulpif( config.env === 'prod', uglify() ) )
                    .pipe( gulp.dest(paths.dist.base) );
            });

}());
