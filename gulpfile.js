var gulp = require('gulp');
var babel = require('gulp-babel');
var connect = require('gulp-connect');

gulp.task('webserver', function() {
  connect.server({
    port: 8080,
    host: 'celerity.dev',
    livereload: true
  });
});

gulp.task('babel', function() {
  return gulp.src('src/app.jsx')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('src/*.jsx', ['babel']);
});

gulp.task('default', ['babel', 'webserver', 'watch']);
