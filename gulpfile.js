var gulp = require('gulp');
var minify = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyHTML = require('gulp-minify-html');
var htmlreplace = require('gulp-html-replace');
var serve = require('gulp-serve');
var autoprefixer = require('gulp-autoprefixer');
var $ = require('gulp-load-plugins')();
var fs = require('fs');

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

gulp.task('copy:css-images', function () {
    return gulp.src('css/images/*')
        .pipe(gulp.dest('dist/css/images'));
});

gulp.task('copy:images', function () {
    return gulp.src('images/**/*')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('copy:statics', function () {
    return gulp.src('static/**/*')
        .pipe(gulp.dest('dist/static'));
});

gulp.task('copy:seo', function () {
    return gulp.src(['robots.txt', 'sitemap.xml'])
        .pipe(gulp.dest('dist'));
});

gulp.task('compress:css', function() {
    gulp.src(getCssFilesArray())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe($.replace('images/', 'css/images/'))
        .pipe(minify())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('compress:js', function() {
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

function inserFile (s, filename) {
    var fileContent = fs.readFileSync(filename, 'utf8');
    return fileContent;
}

gulp.task('html:replace', function () {
    return gulp.src('*.html')
        .pipe($.replace(/\<\!\-\- include:(.+) \-\-\>/g, inserFile))
        .pipe($.replace(/\/\* replace:(.+) \*\//g, inserFile))
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', serve({
    root: ['dist'],
    port: 8000
}));

gulp.task('watch', ['serve'], function () {
    gulp.watch(['./*.html', 'js/*.*', 'css/*.*'], ['default']);
});

gulp.task('default', [
    'copy:images',
    'copy:css-images',
    'compress:js',
    'compress:css',
    'copy:seo',
    'copy:statics'
]);

