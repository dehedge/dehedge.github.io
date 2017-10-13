const gulp = require('gulp');
const connect = require('gulp-connect');
const config = require('./gulp/config');

require('./gulp/html');
require('./gulp/custom');

gulp.task('server', () => connect.server({
    root: config.dest,
    port: 3000
}));

gulp.task('default', ['html', 'custom']);
