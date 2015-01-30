var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var	livereload = require('gulp-livereload');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');

var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cssGlobbing = require('gulp-css-globbing');


var bundler = watchify(browserify('./src/js/app.js'));


// Bundle
function bundle(){
	//https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
	//https://github.com/gulpjs/gulp/tree/master/docs/recipes

	return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(uglify())
		.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./_/js'))
    .pipe(livereload());
}


// Reload
gulp.task('reload', function () {
	livereload.changed('**/*');
});

// SCSS
// Compile vendor css and scss
gulp.task('css', function () {
	gulp.src('src/scss/*.scss')
	.pipe(cssGlobbing({
      extensions: ['.scss'],
    }))
	.on('error', gutil.log)
	.pipe(sass())
	.pipe(gulp.dest('./_/css'))
	.pipe(livereload());

});


// Watch
gulp.task('watch', function() {
	livereload.listen();
	
	gulp.watch('./src/js/*.js', ['js']); 
	gulp.watch('./src/scss/**/*.scss', ['css']); 
	gulp.watch('./index.html', ['reload']);
});



// Default
gulp.task('default', ['watch','js']);
gulp.task('js', bundle);