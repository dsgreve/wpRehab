var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function() {
    browserSync.init({
        notify: false, //Hides reload message
        proxy: "http://localhost/wordpressrehab/"
    });

    watch('./**/*.php', function() {
        browserSync.reload();
    });
    watch('src/css/**/*.css', function() {
        gulp.start('cssInject');
    });
});
//create task to inject css without refreshing window and run styles task
gulp.task('cssInject', ['wpStyles'], function(){
    return gulp.src('style.css')
        .pipe(browserSync.stream());
});