import gulp, { series } from "gulp";
import { deleteSync } from "del";
import concatCss from "gulp-concat-css";
import minifyCss from "gulp-minify-css";
import browserSync from "browser-sync";
import sourcemaps from "gulp-sourcemaps";
import terser from "gulp-terser";
import imagemin from "gulp-imagemin";

const sync = browserSync.create();

gulp.task("clean", function (done) {
  deleteSync(["./dist"]);
  done();
});

gulp.task("concat-css", function () {
  return gulp
    .src("./src/styles/*.css")
    .pipe(concatCss("super.css"))
    .pipe(gulp.dest("dist/styles"))
    .pipe(sync.stream());
});

gulp.task("minify-css", function () {
  return gulp
    .src("./src/styles/*.css")
    .pipe(sourcemaps.init())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/styles"))
    .pipe(sync.stream());
});

gulp.task("dist-index", function () {
  return gulp
    .src("./src/index.html")
    .pipe(gulp.dest("dist"))
    .pipe(sync.stream());
});

gulp.task("dist-html", function () {
  return gulp
    .src("./src/html/*.*")
    .pipe(gulp.dest("dist/html"))
    .pipe(sync.stream());
});

gulp.task("minify-js", function () {
  return gulp
    .src("./src/scripts/*.js")
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

gulp.task("server", function () {
  sync.init({
    server: "./dist",
  });

  gulp
    .watch("./src/styles/*.css", series("concat-css", "minify-css"))
    .on("change", sync.reload);
  gulp
    .watch("./src/index.html", series("dist-index"))
    .on("change", sync.reload);
  gulp
    .watch("./src/html/*.html", series("dist-html"))
    .on("change", sync.reload);
  gulp
    .watch("./src/scripts/*.js", series("minify-js"))
    .on("change", sync.reload);
  gulp
    .watch("./src/images/*", series("minify-images"))
    .on("change", sync.reload);
});

gulp.task("default", function (done) {
  gulp.series(
    "clean",
    "minify-css",
    "concat-css",
    "dist-index",
    "dist-html",
    "minify-js",
    "minify-images",
    "server"
  )(done);
});
