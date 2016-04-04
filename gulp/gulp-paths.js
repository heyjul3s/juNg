module.exports = {
        app : './app/',
        dev : {
            html : [
                './app/index.jade',
                './app/views/**/*.jade',
                './app/partials/**/*.jade'
            ],
            css : [
                './app/views/**/*.styl',
                './app/partials/**/*.styl'
            ],
            js : [
                './app/**/**/*.js',
                // './app/views/**/*.js',
                '!./app/dist/*.js'
            ]
        },
        dist : {
            base : './app/dist',
            html : [ './app/', './app/views/**/', './app/partials/**/' ],
            css  : './dist/**/*.css',
            js   : './dist/**/*.js',
            img  : './img'
        },
        img : './img/src',
        lib : [
            './node_modules/angular/angular.js',
            './node_modules/angular-sanitize/angular-sanitize.js',
            './node_modules/angular-ui-router/angular-ui-router.js'
        ],
        watch: {
            styles     : ['./app/**/*.styl'],
            js         : ['./app/**/*.js'],
            html       : ['./app/index.jade', './app/**/*.jade'],
            livereload : [
                './app/**/*.html',
                './app/dist/**/*.js',
                './app/dist/**/*.css'
            ]
        }
}
