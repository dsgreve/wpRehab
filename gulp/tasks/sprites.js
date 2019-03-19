var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del');

const config = {
    mode: {
        css: {
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
}

gulp.task('beginClean', function(){
    return del(['./images/sprite','./images/sprites']);
});

gulp.task('createSprite', ['beginClean'],function(){
    return gulp.src('./src/images/icons/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./images/sprite/'));
});

gulp.task('copySpriteGraphic', ['createSprite'],function() {
    return gulp.src('./images/sprite/css/**/*.svg')
        .pipe(gulp.dest('images/sprites'));
})


gulp.task('copySpriteCSS', ['createSprite'],function(){
    return gulp.src('./images/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./src/css/modules'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'],function(){
    return del('./images/sprite');
});

gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic','copySpriteCSS', 'endClean']);