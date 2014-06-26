var gulp = require('gulp')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')

gulp.task('build:js', function () {
	return browserify('./src/index.js')
		.external(['vue'])
		.bundle()
		.pipe(source('vue-viewport.js'))
		.pipe(gulp.dest('dist'))
})

gulp.task('build', ['build:js'], function () {
	return gulp.src(['dist/**/*.js', '!**/*.min.js'])
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist'))
})

gulp.task('default', ['build'])
