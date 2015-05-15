/* jshint node:true */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('jshint', function () {
	return gulp.src('src/**/*.js')
	    .pipe($.jshint())
	    .pipe($.jshint.reporter('jshint-stylish'))
	    .pipe($.jshint.reporter('fail'));
});

gulp.task('scripts', function () {
	return gulp.src('src/**/*.js')
		.pipe($.concat('jndroid.js'))
		.pipe(gulp.dest('dist'))
		.pipe($.rename('jndroid.min.js'))
		.pipe($.uglify())
		.pipe(gulp.dest('dist'))
});

gulp.task('clean', require('del').bind(null, ['dist']));


gulp.task('build', ['scripts'], function () {
	return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
	gulp.start('build');
});
