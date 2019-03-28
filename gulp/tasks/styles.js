var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
hexrgba = require('postcss-hexrgba');


gulp.task('styletest', function() {
    return gulp.src('./app/assets/styles/styles.css')
      .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
      .pipe(gulp.dest('./custom/temp/styles'));
  });

    gulp.task('styles_XX', function() {
        return gulp.src('./src/css/new_styles.css')
        .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
        .on('error', function(){
            this.emit('end');
        })
        .pipe(gulp.dest('./custom/css'))
    });

    // run css import to create main wp style file
    gulp.task('wpStyles',['styles'], function() {
        return gulp.src("./custom/styles/style.css")
        .pipe(postcss([cssImport]))
        .pipe(gulp.dest("./"));
    }); 
    