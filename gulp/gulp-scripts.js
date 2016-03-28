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
        // ngAnnotate      = require('browserify-ngannotate'),
        babelify        = require('babelify'),
        fs              = require('vinyl-fs'),
        buffer          = require('vinyl-buffer'),
        source          = require('vinyl-source-stream'),
        uglify          = require('gulp-uglify'),
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


    gulp.task('libs', function () {
        return browserify()
            .on('error', gutil.log)
                .require(dependencies)
                .bundle()
                .pipe( gulpif( config.env === 'prod', source('./libs.min.js'), source('./libs.js') ) )
                .pipe( gulp.dest(paths.dist.base) );
            });


    gulp.task('js', function () {
        return browserify({
                entries: './app/app.js',
                debug: true
                // transform: [ ngAnnotate ]
            })
            .transform( 'babelify', {
                presets: [ 'es2015' ]
            })
            .bundle()
                .on('error', gutil.log)
                    .pipe( gulpif( config.env === 'prod', source('./production.min.js'), source('./production.js') ) )
                    .pipe( buffer() )
                    .pipe( ngAnnotate() )
                    // .pipe( gulpif( config.env === 'prod', ngAnnotate() ) )
                    .pipe( gulpif( config.env === 'prod', uglify() ) )
                    .pipe( gulp.dest(paths.dist.base) );
            });

}());
