const gulp = require('gulp'),
    csso = require('gulp-csso'),
    cleanCSS = require('gulp-clean-css'),
    combineMq = require('gulp-combine-mq'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    pug = require('gulp-pug'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'), // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
    reload = browserSync.reload,
    path = require('path'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    pump = require('pump'),
    stylus = require('gulp-stylus'),
    notify = require("gulp-notify"),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    image = require('gulp-image');




gulp.task('styles', () => {
    return gulp.src('src/**/styles.styl')
        .pipe(stylus({
            'include css': true
        }))
        // .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .on("error", notify.onError({
            message: "Error: <%= error.message %>",
            title: "Error running something"
        }))
        .pipe(rename('bundle.min.css'))
        .pipe(gulp.dest('wp-content/themes/snobart/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('styles:build', () => {
    return gulp.src('src/**/styles.styl')
        .pipe(stylus({
            'include css': true
        }))
        .pipe(cleanCSS())
        
        // .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .on("error", notify.onError({
            message: "Error: <%= error.message %>",
            title: "Error running something"
        }))
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(combineMq({
            beautify: false
        }))
        .pipe(csso())
        .pipe(rename('bundle.min.css'))
        .pipe(gulp.dest('wp-content/themes/snobart/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
gulp.task('images', function() {
    return gulp.src('./src/images/*')
        .pipe(image())
        .pipe(gulp.dest('wp-content/themes/snobart/images'))
})


gulp.task('js', function() {
     return gulp.src('./src/scripts/probe.js')
        .pipe(concat('bundle.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('wp-content/themes/snobart/scripts'));
});

gulp.task('indexTemplate', function() {
    return gulp.src('src/*.pug')
        .pipe(pug({
            pretty: true,
            basedir: 'src'
        }))
        .on("error", notify.onError({
            message: "Error: <%= error.message %>",
            title: "Error running something"
        }))
        .pipe(gulp.dest('wp-content/themes/snobart'))
});

gulp.task('styles-watch', ['styles'], reload);
gulp.task('pug-watch', ['indexTemplate'], reload);
gulp.task('js-watch', ['js'], reload);

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'wp-content/themes/snobart',
            open: false
        },
    })
})

/**
 * Serve and watch the pug files for changes
 */
gulp.task('default', ['indexTemplate', 'js', 'styles', 'browserSync', 'images'], function() {
    gulp.watch(['src/**/*.styl', 'src/**/*.css'], ['styles-watch']);
    gulp.watch('src/**/*.pug', ['pug-watch']);
    gulp.watch('src/**/*.js', ['js-watch']);
});

gulp.task('build',['js:build','styles:build']);