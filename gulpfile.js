var gulp = require('gulp'),
    concat = require('gulp-concat'),
    replace = require('gulp-replace'),
    watch = require('gulp-watch'),
    templateCache = require('gulp-angular-templatecache'),
    sass = require('gulp-sass'),
    mainBowerFiles = require('main-bower-files'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    ngAnnotate = require('gulp-ng-annotate'),
    minifyCss = require('gulp-minify-css'),
    angularFilesort = require('gulp-angular-filesort'),
    gulpFilter = require('gulp-filter'),
    wiredep = require('wiredep').stream,
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload');


// ----------------------------------------------------------------- //

// Compiling all the third-part libraries JS files, HTML Files and CSS/SASS files into main.js, partials.js and main.css

gulp.task('app:JS', function () {
    gulp.src([
            'app/**/*.js',
            '!app/dist/*.js',
            '!app/cache/*.js'
        ])
        .pipe(ngAnnotate())
        .pipe(angularFilesort())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/cache'))
        .pipe(livereload());
});


gulp.task('app:CSS', function () {
    return gulp.src([
            'app/**/*.scss',
            '!app/dist/*.css',
            '!app/cache/*.css'
        ])
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('app/cache'))
        .pipe(livereload());
});


gulp.task('app:HTML', function () {
    return gulp.src(['app/**/*.html', '!app/index.html'])
        .pipe(minifyHTML())
        .pipe(templateCache('partials.js', {module: 'ngGitHub', standalone: false}))
        .pipe(uglify())
        .pipe(gulp.dest('app/cache'))
        .pipe(livereload());
});

// ----------------------------------------------------------------- //

// Compiling all the third-part libraries JS files and CSS files into 3rdParty.js and 3rdParty.css

gulp.task('3rdParty:JS', function () {
    return gulp.src(mainBowerFiles())
        .pipe(gulpFilter('**/*.js'))
        .pipe(wiredep())
        .pipe(uglify())
        .pipe(concat('3rdParty.js'))
        .pipe(gulp.dest('app/cache'));

});

gulp.task('3rdParty:CSS', function () {
    return gulp.src(mainBowerFiles())
        .pipe(wiredep())
        .pipe(gulpFilter('**/*.css'))
        .pipe(minifyCss())
        .pipe(concat('3rdParty.css'))
        .pipe(gulp.dest('app/cache'));
});


// for development purposes
gulp.task('watch', function () {
    livereload.listen();
    watch(['app/**/*.js', '!app/cache/*.js', '!app/dist/*.js'], run('app:JS'));
    watch(['app/**/*.html'], run('app:HTML'));
    watch(['app/**/*.scss'], run('app:CSS'));
    watch(['bower.json'], run('3rdParty:JS'));
    watch(['bower.json'], run('3rdParty:CSS'));
});


function run(taskName) {
    return function () {
        gulp.start(taskName);
    }
}


// for deployment

gulp.task('local', [
    'app:JS',
    'app:HTML',
    'app:CSS',
    '3rdParty:JS',
    '3rdParty:CSS'
], function () {



    // replace the script and stylsheet references in index.html
    gulp.src([
            'app/index.html'
        ])
        .pipe(replace('<link rel="stylesheet" href="dist/dist.css">', '<!--<link rel="stylesheet" href="dist/dist.css"   >-->'))
        .pipe(replace('<!--<link rel="stylesheet" href="cache/main.css"   >-->', '<link rel="stylesheet" href="cache/main.css">'))
        .pipe(replace('<!--<link rel="stylesheet" href="cache/3rdParty.css"   >-->', '<link rel="stylesheet" href="cache/3rdParty.css">'))

        .pipe(replace('<script src="dist/dist.js"></script>', '<!--<script src="dist/dist.js"   ></script>-->'))
        .pipe(replace('<!--<script src="cache/3rdParty.js"   ></script>-->', '<script src="cache/3rdParty.js"></script>'))
        .pipe(replace('<!--<script src="cache/main.js"   ></script>-->', '<script src="cache/main.js"></script>'))
        .pipe(replace('<!--<script src="cache/partials.js"   ></script>-->', '<script src="cache/partials.js"></script>'))
        .pipe(gulp.dest('app/'));

});


gulp.task('deploy', ['local'], function () {
    // final packaging
    // concatenate all JS files into 1 JS file and all CSS files into 1 CSS file
    gulp.src([
            'app/cache/3rdParty.js',
            'app/cache/main.js',
            'app/cache/partials.js'
        ])
        .pipe(concat('dist.js'))
        .pipe(gulp.dest('app/dist/'));

    gulp.src([
            'app/cache/main.css',
            'app/cache/3rdParty.css'
        ])
        .pipe(concat('dist.css'))
        .pipe(gulp.dest('app/dist/'));


    // replace the script and stylsheet references in index.html
    gulp.src([
            'app/index.html'
        ])
        .pipe(replace('<!--<link rel="stylesheet" href="dist/dist.css"   >-->', '<link rel="stylesheet" href="dist/dist.css">'))
        .pipe(replace('<link rel="stylesheet" href="cache/main.css">', '<!--<link rel="stylesheet" href="cache/main.css"   >-->'))
        .pipe(replace('<link rel="stylesheet" href="cache/3rdParty.css">', '<!--<link rel="stylesheet" href="cache/3rdParty.css"   >-->'))

        .pipe(replace('<!--<script src="dist/dist.js"   ></script>-->', '<script src="dist/dist.js"></script>'))
        .pipe(replace('<script src="cache/3rdParty.js"></script>', '<!--<script src="cache/3rdParty.js"   ></script>-->'))
        .pipe(replace('<script src="cache/main.js"></script>', '<!--<script src="cache/main.js"   ></script>-->'))
        .pipe(replace('<script src="cache/partials.js"></script>', '<!--<script src="cache/partials.js"   ></script>-->'))
        .pipe(gulp.dest('app/'));
});
