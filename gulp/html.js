const gulp = require('gulp');
const path = require('path');
const async = require('async');
const fs = require('fs');
const config = require('./config');

gulp.task('html-assets', () =>
    gulp
        .src(config.assetsFolders.map(x => config.prefix + 'content/' + x + '/**/*'), {base: config.prefix + 'content/'})
        .pipe(gulp.dest(config.dest)));

gulp.task('html-pages', done => {
    if (!fs.existsSync(config.dest))
        fs.mkdirSync(config.dest);

    async.every(Object.keys(config.pages), function(item, callback) {
        let target = config.pages[item];
        let res = fs.readFileSync(config.prefix + 'content/' + item + '.html').toString()
            .replace(new RegExp('"(' + config.assetsFolders.join('|') + ')', 'g'), '"/$1')
            .replace('en.html', '/')
            .replace(new RegExp('index.html', 'g'), '/ru')
            .replace('</head>', '<script src="/js/city.js"></script></head>');

        target = (target !== 'index' ? target + '/index' : target) + '.html';
        let dir = config.dest + path.dirname(target);

        if (!fs.existsSync(dir))
            fs.mkdirSync(dir);

        fs.writeFile(config.dest + target, res, null, (err) => {
            if (err)
                throw err;
            callback();
        });
    }, () => done());
});

gulp.task('html', ['html-assets', 'html-pages']);

