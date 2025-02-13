const gulp = require("gulp"),
  pug = require("gulp-pug"),
  sass = require("gulp-sass")(require("sass")),
  sassGlob = require("gulp-sass-glob"),
	browserSync = require('browser-sync').create(),
  clean = require("gulp-clean"),
  fs = require("fs"),
  sourceMaps = require("gulp-sourcemaps"),
  plumber = require("gulp-plumber"),
  notify = require("gulp-notify"),
  changed = require("gulp-changed"),
  svgSprite = require("gulp-svg-sprite"),
  svgmin = require("gulp-svgmin"),
  cheerio = require("gulp-cheerio"),
  replace = require("gulp-replace"),
  imagemin = require("gulp-imagemin"),
  webp = require("gulp-webp");

const webpack = require("webpack-stream");
const babel = require("gulp-babel");

// === stop VARIABLES ===

// === PLUMBER
const plumberNotify = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: "Error <%= error.message %>",
      sound: false,
    }),
  };
};

// === BABEL
const babelSettings = {
  presets: ["@babel/preset-env"],
};

// === start CLEAN ===
gulp.task("clean:dev", function (callback) {
  if (fs.existsSync("./build/")) {
    return gulp.src("./build/", { read: false }).pipe(clean({ force: true }));
  }
  callback();
});
// === stop CLEAN ===

// === start PUG ===
gulp.task("pug:dev", function () {
  return gulp
    .src("./src/pug/*.pug")
    .pipe(plumber(plumberNotify("PUG")))
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("./build"))
		.pipe(browserSync.stream())
});
// === stop PUG ===

// === start SCSS ===
gulp.task("sass:dev", function () {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(plumber(plumberNotify("SASS")))
    .pipe(sourceMaps.init())
    .pipe(
      sass({
        sass: require("sass"),
        outputStyle: "expanded",
        silenceDeprecations: ["legacy-js-api"],
      }).on("error", sass.logError)
    )
    .pipe(sassGlob())
    .pipe(sourceMaps.write("."))
    .pipe(gulp.dest("./build/css/"))
		.pipe(browserSync.stream())
});
// === stop SCSS ===

// === start IMAGES ===
gulp.task("images:dev", function () {
  return gulp
    .src("./src/images/**/*.+(jpg|jpeg|png)")
    .pipe(changed("./build/images/"))
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest("./build/images/"))
		.pipe(browserSync.stream())
});
gulp.task("imagesWebp:dev", function () {
  return gulp
    .src("./src/images/**/*.+(jpg|jpeg|png)")
    .pipe(changed("./build/images/"))
    .pipe(webp())
    .pipe(gulp.dest("./build/images/"));
});
gulp.task("imageSvg:dev", function () {
  return gulp
    .src("./src/images/svg/*.svg")
    .pipe(changed("./build/images/svg/"))
    .pipe(gulp.dest("./build/images/svg"))
		.pipe(browserSync.stream());
});
// === stop IMAGES ===

// === start UPLOADS ===
gulp.task("uploads:dev", function () {
  return gulp
    .src("./src/uploads/**/*.+(jpg|jpeg|png)")
    .pipe(changed("./build/uploads/"))
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest("./build/uploads/"))
		.pipe(browserSync.stream());
});
gulp.task("uploadsWebp:dev", function () {
  return gulp
    .src("./src/uploads/**/*.+(jpg|jpeg|png)")
    .pipe(changed("./build/uploads/"))
    .pipe(webp())
    .pipe(gulp.dest("./build/uploads/"));
});
// === stop UPLOADS ===

// === start SVG SPRITE ===
gulp.task("svgSprite:dev", function () {
  return gulp
    .src("./src/images/sprite/*.svg")
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      cheerio({
        run: function ($) {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
        },
        parserOptions: { xmlMode: true },
      })
    )
    .pipe(replace("&gt;", ">"))
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
            example: true,
          },
        },
      })
    )
    .pipe(gulp.dest("./build/images/sprite/"))
		.pipe(browserSync.stream())
});
// === stop SVG SPRITE ===

// === start FONTS ===
gulp.task("fonts:dev", function () {
  return (
    gulp
      .src("./src/fonts/*.*")
      .pipe(gulp.dest("./build/fonts/"))
  );
});
// === stop FONTS ===

// === start ROOT'S REPLACE ===
gulp.task("root:dev", function () {
  return gulp
    .src("./src/*.+(ico|php|htaccess|txt)")
    .pipe(changed("./build/"))
    .pipe(gulp.dest("./build/"))
		.pipe(browserSync.stream());
});
// === stop ROOT'S REPLACE ===

// === start JS ===
gulp.task("js:dev", function () {
  return gulp
    .src("./src/js/*.js")
    .pipe(plumber(plumberNotify("JS")))
    .pipe(babel(babelSettings))
    .pipe(webpack(require("./../webpack.config.js")))
    .pipe(gulp.dest("./build/js/"))
		.pipe(browserSync.stream())
});
// === stop JS ===
// === start JS Vendore ===
gulp.task("jsVendor:dev", function () {
  return gulp
    .src("./src/js/vendor/*.js")
    .pipe(plumber(plumberNotify("JS Vendor")))
    .pipe(gulp.dest("./build/js/vendor/"))
});
// === stop JS Vendore ===

// === start WATCH ===
gulp.task("watch:dev", function () {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
    notify: false,
    port: 3000
  });
	gulp.watch("./src/pug/**/*.pug", gulp.parallel("pug:dev"));
  gulp.watch("./src/scss/**/*.scss", gulp.parallel("sass:dev"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("js:dev", "jsVendor:dev"));
  gulp.watch("./src/fonts/**/*", gulp.parallel("fonts:dev"));
  gulp.watch("./src/images/svg/**/*", gulp.parallel("imageSvg:dev"));
  gulp.watch("./src/images/sprite/**/*", gulp.parallel("svgSprite:dev"));
  gulp.watch("./src/images/**/*.+(jpg|jpeg|png)", gulp.parallel("images:dev", "imagesWebp:dev"));
  gulp.watch("./src/uploads/**/*.+(jpg|jpeg|png)", gulp.parallel("uploads:dev", "uploadsWebp:dev"));
  gulp.watch("./src/*.+(ico|php|htaccess|txt)", gulp.parallel("root:dev"));
});
// === stop WATCH ===
