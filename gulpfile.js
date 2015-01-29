var gulp = require('gulp');
var	livereload = require('gulp-livereload');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify')


var bundler = watchify(browserify('./assets/js/app.js'));


// Reload
gulp.task('reload', function () {
	livereload.changed('**/*');
});


// Watch
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('./assets/js/*.js', ['reload']); 
	gulp.watch('./index.html', ['reload']);
});


// Bundle
function bundle(){
	return bundler.bundle()
	// log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you dont want sourcemaps
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
      .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'));
}


// Default
gulp.task('default', ['watch','reload']);
gulp.task('js', bundle);