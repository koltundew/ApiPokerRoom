const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
const minify = require('gulp-minify');
const reload      = browserSync.reload;

//comiple scss into css
function style(){
    //1. where is my scss file
    return gulp.src('./scss/**/*.scss')
    //2. pass that file through sass compiler
    .pipe(sass().on('error', sass.logError))
    //3. where do i save the compiled CSS?
    .pipe(gulp.dest('./css'))
    //4.stream change to all browser
    .pipe(browserSync.stream());
}

function watch(){
    browserSync.init({
        server:{
            baseDir: './'
        }
    });
    
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./*.html').on('chage', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

//autoprefixer
exports.default = () => (
    gulp.src('src/app.css')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
);
//uglyfi
gulp.task('compress', function () {
    return pipeline(
          gulp.src('lib/*.js'),
          uglify(),
          gulp.dest('dist')
    );
  });

  //gulp minify
  gulp.task('compress', function() {
    gulp.src(['lib/*.js', 'lib/*.mjs'])
      .pipe(minify())
      .pipe(gulp.dest('dist'))
  });


exports.style = style;
exports.watch = watch;

gulp.task('serve', function () {

    

    gulp.watch("./*.html").on("change", reload);
});