"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var run = require("run-sequence");
var del = require("del");

 gulp.task("style", function () {
   gulp.src("sass/style.scss")
     .pipe(plumber())
     .pipe(sass())
     .pipe(postcss([
       autoprefixer()
     ]))
     .pipe(gulp.dest("build/css"))
     .pipe(minify())
     .pipe(rename("style.min.css"))
     .pipe(gulp.dest("build/css"));
 });

 gulp.task("html", function () {
   return gulp.src("*.html")
     .pipe(posthtml([
       include()
     ]))
     .pipe(gulp.dest("build"));
 });

 gulp.task("images", function () {
   return gulp.src("img/**/*.{png,jpg,svg}")
     .pipe(imagemin ([
       imagemin.optipng({optimizationLevel: 3}),
       imagemin.jpegtran({progressive: true}),
       imagemin.svgo()
     ]))
     .pipe(gulp.dest("img"));
 });

 gulp.task("webp", function () {
   return gulp.src("img/**/*.{png,jpg}")
     .pipe(webp({quality: 90}))
     .pipe(gulp.dest("img"));
 });

 gulp.task("serve", function () {
   server.init({
     server: "build/"
   });

   gulp.watch("sass/**/*.scss", ["style"]);
   gulp.watch("*.html", ["html"]);
 });

 gulp.task("copy", function () {
   return gulp.src([
     "fonts/**/*.{woff,woff2}",
     "img/**",
     "js/**"
   ], {
     base: "."
   })
   .pipe(gulp.dest("build"));
 });

 gulp.task("clean", function () {
   return del("build");
 });

 gulp.task("build", function (done) {
   run(
     "clean",
     "copy",
     "style",
     "html",
     done
     );
 });
