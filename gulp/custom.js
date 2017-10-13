const gulp = require('gulp');
const config = require('./config');

gulp.task('custom-copy', () =>
    gulp
        .src(config.prefix + 'js/**/*')
        .pipe(gulp.dest(config.dest + 'js/')));

gulp.task('custom', ['custom-copy']);

