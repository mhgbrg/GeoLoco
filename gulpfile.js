var app = require('./app'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat');

 gulp.task('js', function() {
     return gulp.src(['assets/js/map.js', 'assets/js/**/*.js'])
         .pipe(concat('main.min.js'))
         .pipe(gulp.dest('public/js/'));
 });

gulp.task('sass', function() {
    return gulp.src(['assets/sass/app.scss'])
        .pipe(sass().on('error', function(error) {
            console.log(error.toString());
            this.emit('end');
        }))
        .pipe(gulp.dest('public/stylesheets/'));
});
 
gulp.task('serve', function() {
  // Listens to /public/
    app.listen(process.env.PORT || 1337);
});
 
// Requires gulp >=v3.5.0
gulp.task('watch', function () {
    gulp.watch('assets/sass/**/*.scss', ['sass']);
    gulp.watch('assets/js/**/*.js', ['js']);
});
 
gulp.task('default', ['sass', 'js', 'serve', 'watch']);