(function(){
    'use strict';

    var gulp            = require('gulp'),
        del             = require('del'),
        webserver       = require('gulp-webserver');

    gulp.task('serve', function() {
        gulp.src('app')
            .pipe(webserver({
                host: 'localhost',
                port: 8888,
                livereload: true,
                directoryListing: false,
                open: true
                // fallback: './app/index.html'
            }));
    });

    //DONE
    gulp.task('clean', function(){
        return del([
            './app/dist/**/*',
            './app/dist/**/*.js',
            './app/dist/**/*.css'
        ]).then(paths => {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        });
    });

}());
