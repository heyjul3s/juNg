module.exports = function(gulp, plugins) {
    return function() {
        return extend( { env: process.env.NODE_ENV }, parseArgs( process.argv.slice(2)) );
    }
};

// var config = extend({
//    env: process.env.NODE_ENV
// }, parseArgs( process.argv.slice(2)) );
