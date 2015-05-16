var app = require('./app'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat');

// gulp.task('browserify', function() {
//     return gulp.src(['app/src/**/*.js'])
//         .pipe(browserify())
//         .pipe(concat('dest.js'))
//         .pipe(gulp.dest('dist/build'));
// });

gulp.task('sass', function() {
    return gulp.src(['sass/app.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/stylesheets/'));
});
 
gulp.task('serve', function() {
  // Listens to /public/
    app.listen(1337);
});
 
// Requires gulp >=v3.5.0
gulp.task('watch', function () {
    livereloadServer.listen(35729, function (err) {
        if (err) return console.log(err);
    });
    gulp.watch('sass/app.scss', ['sass']);
});
 
gulp.task('default', ['sass', 'serve', 'watch']);