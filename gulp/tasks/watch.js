var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function() {
    browserSync.init({
        notify: false, //Hides reload message
        proxy: "http://localhost:81/wordpressrehab/"
    });

    watch('./**/*.php', function() {
        browserSync.reload();
    });
    watch('src/css/**/*.css', function() {
        gulp.start('cssInject');
    });
    watch('src/scripts/**/*.js', function() {
        gulp.start('scriptsRefresh');
    });
});
//create task to inject css without refreshing window and run styles task
gulp.task('cssInject', ['wpStyles'], function(){
    return gulp.src('style.css')
        .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function(){
    browserSync.reload();
});