var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var	livereload = require('gulp-livereload');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify')


var bundler = watchify(browserify('./src/js/app.js'));


// Bundle
function bundle(){
	return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
}


// Reload
gulp.task('reload', function () {
	livereload.changed('**/*');
});


// Watch
gulp.task('watch', function() {
	livereload.listen();
	
	gulp.watch('./src/js/*.js', ['js']); 
	gulp.watch('./index.html', ['reload']);
});



// Default
gulp.task('default', ['watch','js']);
gulp.task('js', bundle);