import gulp from "gulp";
import concatCss from "gulp-concat-css";
import minifyCss from "gulp-minify-css";
import sourcemaps from "gulp-sourcemaps";
import terser from "gulp-terser";
import imagemin from "gulp-imagemin";

gulp.task("minify-css", function () {
  return gulp
    .src("./src/styles/*.css")
    .pipe(sourcemaps.init())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/styles"));
});

gulp.task("concat-css", function () {
  return gulp
    .src("./src/styles/*.css")
    .pipe(concatCss("super.css"))
    .pipe(gulp.dest("dist/styles"));
});

gulp.task("dist-html", function () {
  return gulp.src("./src/html/*.*").pipe(gulp.dest("dist/html"));
});

gulp.task("minify-js", function () {
  return gulp
    .src("src/scripts/*.js")
    .pipe(terser())
    .pipe(gulp.dest("dist/scripts"));
});

gulp.task("minify-images", function () {
  return gulp
    .src("./src/images/*", { encoding: false })
    .pipe(
      imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true,
        multipass: true,
      })
    )
    .pipe(gulp.dest("dist/images"));
});

gulp.task("default", function (done) {
  gulp.series(
    "minify-css",
    "concat-css",
    "dist-html",
    "minify-js",
    "minify-images"
  )(done);
});
