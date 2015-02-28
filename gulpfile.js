var gulp = require('gulp');
var minify = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyHTML = require('gulp-minify-html');
var htmlreplace = require('gulp-html-replace');
var serve = require('gulp-serve');
var autoprefixer = require('gulp-autoprefixer');

function getCssFilesArray () {
    return [
        "bower_components/normalize-css/normalize.css",
        "css/style.css",
        "css/style-mobile.css",
        "css/style-narrower.css",
        "css/style-normal.css",
        "css/style-wide.css"
    ];
}

gulp.task('html-replace', ['compress:css'], function() {
    gulp.src('*.html')
        .pipe(htmlreplace({
            'css': 'css/styles.min.css',
            'js': 'js/bundle.min.js'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy:css-images', function () {
    return gulp.src('css/images/*')
        .pipe(gulp.dest('dist/css/images'));
});

gulp.task('compress:css', function() {
    gulp.src(getCssFilesArray())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minify())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('compress:js', function() {
    return gulp.src(getJsFilesArray())
        .pipe(uglify())
        .pipe(concat('bundle.min.js'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('serve', serve({
    root: ['dist'],
    port: 8000
}));
gulp.task('serve-prod', serve({
    root: ['dist'],
    port: 8000,
    middleware: function(req, res) {
        // custom optional middleware
    }
}));

gulp.task('default', [
    'compress:css',
    'copy:css-images',
    'html-replace'
]);
