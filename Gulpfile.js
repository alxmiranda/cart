const gulp   = require("gulp");
const server = require("gulp-express");
const pug    = require("gulp-pug");
const babel  = require("gulp-babel");
const stylus = require("gulp-stylus");
const rename = require("gulp-rename");
const concat = require("gulp-concat");

const devPaths = {
    html: '-dev/**/*.pug',
    styl: '-dev/style.styl',
    css: '-dev/**/style.styl',
    js: '-dev/**/script.js'
}

const buildPaths = {
    html: 'build/',
    css: 'build/css/',
    js: 'build/js/'
}

// start server
gulp.task('server', () => {
    server.run(['app.js']);
})

gulp.task('html', () => {
    gulp.src(devPaths.html)
    .pipe(pug())
    .pipe(rename({dirname:''}))
    .pipe(gulp.dest(buildPaths.html))
})

// transpile es6 for es5
gulp.task('js', () =>{
	return gulp.src([devPaths.js])
		.pipe(concat('main.js'))
		.pipe(babel({
				presets: ['es2015']
		}))
	  .pipe(gulp.dest(buildPaths.js));
})

// build styl for css
gulp.task('stylus', () => {
  return gulp.src(devPaths.styl)
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest(buildPaths.css));
});

gulp.task('watch', () => {
    gulp.watch(devPaths.html, ['html']);
    gulp.watch(devPaths.css, ['stylus']);
    gulp.watch(devPaths.js, ['js']);
})

gulp.task('default', ['server', 'html', 'stylus', 'js', 'watch'])