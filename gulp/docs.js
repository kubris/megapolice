const gulp 			= require("gulp"),
		pug					= require('gulp-pug'),
		webpHTML 		= require('gulp-webp-html-nosvg'),
		sass 				= require("gulp-sass")(require("sass")),
		autoprefixer 	= require('gulp-autoprefixer'),
		csso 				= require('gulp-csso'),
		sassGlob 		= require("gulp-sass-glob"),
		server 			= require("gulp-server-livereload"),
		clean 			= require("gulp-clean"),
		fs 					= require("fs"),
		groupMedia 	= require("gulp-group-css-media-queries"),
		plumber 		= require("gulp-plumber"),
		notify 			= require("gulp-notify"),
		imagemin 		= require("gulp-imagemin"),
		webp 				= require("gulp-webp");

const webpack 	= require("webpack-stream");
const babel 		= require("gulp-babel");

// -- start server
const startServerSettings = {
	livereload: true,
	open: true,
};
// -- plumber
const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: "Error <%= error.message %>",
			sound: false,
		}),
	};
};

// -- babel
const babelSettings = {
	presets: ["@babel/preset-env"]
};

// === clean docs ===
gulp.task("clean:docs", function (callback) {
	if (fs.existsSync("./docs/")) {
		return gulp.src("./docs/", { read: false }).pipe(clean({ force: true }));
	}
	callback();
});

// ////////////////////////
// === PUG include  ===
gulp.task('pug:docs', function(){
	return gulp.src('./src/pug/*.pug')
		.pipe(plumber(plumberNotify('PUG')))
		.pipe(pug())
		.pipe(webpHTML())
		.pipe(gulp.dest('./docs'))
});
// end PUG include 

// === SCSS ===
gulp.task("sass:docs", function () {
	return gulp
		.src("./src/scss/*.scss")
		.pipe(plumber(plumberNotify("SASS")))
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(groupMedia())
		.pipe(autoprefixer(['last 15 versions', '> 1%']))
		.pipe(csso())
		.pipe(gulp.dest("./docs/css/"));
});
// end SCSS

// === IMAGES ===
gulp.task("images:docs", function () {
	return gulp
		.src("./src/images/**/*")
		.pipe(imagemin({ verbose: true }))
		.pipe(gulp.dest("./docs/images/"));
});
gulp.task("imagesWebp:docs", function () {
	return gulp
		.src("./src/images/**/*.+(jpg|jpeg|png)")
		.pipe(webp())
		.pipe(gulp.dest("./docs/images/"));
});
// end IMAGES

// === FONTS ===
gulp.task('fonts:docs', function(){
	return gulp.src('./src/fonts/*.*')
	.pipe(gulp.dest('./docs/fonts/'))
	.pipe(gulp.dest('./docs/fonts/'))
});
// === end FONTS ===

// === UPLOADS ===
gulp.task('uploads:docs', function(){
	return gulp.src('./src/uploads/**/*')
		.pipe(imagemin({ verbose: true }))
		.pipe(gulp.dest('./docs/uploads/'))
});
gulp.task('uploadsWebp:docs', function(){
	return gulp.src('./src/uploads/**/*.+(jpg|jpeg|png)')
		.pipe(webp())
		.pipe(gulp.dest('./docs/uploads/'))
});
// === end UPLOADS ===

// === ROOT FOLDER files ===
gulp.task('root:docs', function(){
	return gulp.src('./src/*.+(ico|php|htaccess|txt)')
		.pipe(gulp.dest('./docs/'))
});
// === end ROOT FOLDER files ===

// === JS ===
gulp.task("js:docs", function () {
	return gulp
		.src("./src/js/*.js")
		.pipe(plumber(plumberNotify("JS")))
		.pipe(babel(babelSettings))
		.pipe(webpack(require("./../webpack.config.js")))
		.pipe(gulp.dest("./docs/js/"));
});
// === end JS ===

// === START Server ===
gulp.task("server:docs", function () {
	return gulp.src("./docs/").pipe(server(startServerSettings));
});
// end START Server

