let gulp = require("gulp");
let sass = require("gulp-sass");
let browserSync = require("browser-sync");
let gcmq = require("gulp-group-css-media-queries");
let csscomb = require("gulp-csscomb");
let imageMin = require("gulp-tinypng-nokey");
let svgMin = require("gulp-svgmin");
let svgSprite = require("gulp-svg-sprite");
let cheerio = require("gulp-cheerio");
let replace = require("gulp-replace");
let babel = require("gulp-babel");

// app config
let config = {
  root: "app/",
  sass: {
    style: "sass/style.scss",
    files: "sass/**/*.scss"
  },
  css: "css/",
  html: {
    index: "index.html",
    files: "**/*.html"
  },
  js: {
    dist: "js/",
    files: "**/*.js",
    pre: "prejs/"
  },
  img: {
    pre: "preimg/*",
    post: "img"
  },
  svg: {
    pre: "preimg/svg/*.svg",
    post: "img/svg"
  }
};

// svg config
let svgConfig = {
  mode: {
    symbol: true
  }
};

//minify svg and create sprite from them
gulp.task("svg", function () {
  gulp
    .src(config.root + config.svg.pre)
    .pipe(
      svgMin({
        js2svg: {
          pretty: true
        }
      })
    )
    .pipe(
      cheerio({
        run: function ($) {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
        },
        parserOptions: { xmlMode: true }
      })
    )
    // cheerio plugin create unnecessary string '&gt;', so replace it.
    .pipe(replace("&gt;", ">"))
    .pipe(svgSprite(svgConfig))
    .pipe(gulp.dest(config.root + config.svg.post));
});

// minify images
gulp.task("image", function () {
  gulp
    .src(config.root + config.img.pre)
    .pipe(imageMin())
    .pipe(gulp.dest(config.root + config.img.post));
});

gulp.task("sass", function () {
  return gulp
    .src(["app/sass/style.scss"])
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(gcmq())
    .pipe(csscomb())
    .pipe(gulp.dest("app/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});


//init dev-server
gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "app"
    },
    tunnel: false
  });
});

// transpile JavaScript to ES6
gulp.task("transpileJs", function () {
  // gulp.src("app/prejs/script.js");
  gulp
    .src(config.root + config.js.pre + config.js.files)
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(gulp.dest(config.root + config.js.dist));
});

//init watcher
gulp.task("watch", ["browser-sync"], function () {
  gulp.watch(["app/sass/**/*.sass", "app/sass/**/*.scss"], ["sass"]);
  gulp.watch(config.root + config.html.files, browserSync.reload);
  gulp.watch(config.root + config.js.pre + config.js.files, ["transpileJs"]);
  gulp.watch(config.root + config.js.pre + config.js.files, browserSync.reload);
});

