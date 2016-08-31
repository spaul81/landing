// Assigning modules to local variables
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var clean = require('gulp-rimraf');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var createFile = require('create-file');
var autoprefixer = require('gulp-autoprefixer');

// Default task
gulp.task('default', ['sass', 'minify-css', 'minify-js', 'copy']);

// Create clean folders
gulp.task('clean-folders', function () {

    if (gulp.src(['app'], {domain: null})) {

        gulp.src([''], {domain: null})
            .pipe(gulp.dest('app/**/*.*'))
            .pipe(clean())
            .pipe(gulp.dest('app/sass'))
            .pipe(clean())
            .pipe(gulp.dest('app/css'))
            .pipe(clean())
            .pipe(gulp.dest('app/js'))
            .pipe(clean())
            .pipe(gulp.dest('app/img'))
            .pipe(clean());

        createFile('app/index.html', '', function (err) {
            // file either already exists or is now created (including non existing directories)
        });
        createFile('app/js/main.js', '', function (err) {
            // file either already exists or is now created (including non existing directories)
        });
        createFile('app/sass/main.scss', '', function (err) {
            // file either already exists or is now created (including non existing directories)
        });
    }

});

// Sass task
gulp.task('sass', function () { // Создаем таск Sass
    return gulp.src('app/sass/**/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer({ //autoprefixer
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({
            stream: true
        })) // Обновляем CSS на странице при изменении
});

// Minify CSS
gulp.task('minify-css', function () {
    return gulp.src('app/css/main.css')

        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function () {
    return gulp.src('app/js/main.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


// Copy Bootstrap core files from node_modules to vendor directory
gulp.task('bootstrap', function () {
    return gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('app/vendor/bootstrap'))
})

// Copy jQuery core files from node_modules to vendor directory
gulp.task('jquery', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('app/vendor/jquery'))
})

// Copy Font Awesome core files from node_modules to vendor directory
gulp.task('fontawesome', function () {
    return gulp.src([
        'node_modules/font-awesome/**',
        '!node_modules/font-awesome/**/*.map',
        '!node_modules/font-awesome/.npmignore',
        '!node_modules/font-awesome/*.txt',
        '!node_modules/font-awesome/*.md',
        '!node_modules/font-awesome/*.json'
    ])
        .pipe(gulp.dest('app/vendor/font-awesome'))
})

// Swipe Slider
gulp.task('swipeslider', function () {
    return gulp.src(['node_modules/swiper/dist/**/*.*'])
        .pipe(gulp.dest('app/vendor/swiper'))
})


// Copy all third party dependencies from node_modules to vendor directory
gulp.task('copy', ['bootstrap', 'jquery', 'fontawesome', 'swipeslider']);


// Configure the browserSync task
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
        //host: "192.168.1.7"
    })
})

// Watch Task that compiles sass and watches for HTML or JS changes and reloads with browserSync
gulp.task('dev', ['browserSync', 'sass', 'minify-css', 'minify-js'], function () {
    gulp.watch('app/sass/*.scss', ['sass']);
    gulp.watch('app/css/*.css', ['minify-css']);
    gulp.watch('app/js/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/*.php', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch('app/css/**/*.css', browserSync.reload);
});