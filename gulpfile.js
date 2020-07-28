const gulp = require('gulp');

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');



gulp.task('css', function(done){
    console.log('minifying css...');
    gulp.src('./assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

     gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        // cwd: 'public',
        base:'./public/assets',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


gulp.task('js', function(done){
    console.log('minifying js...');
     gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        // cwd: 'public',
        base:'./public/assets',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
});


gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        // cwd: 'public',       
        base:'./public/assets',                      
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});
   //but sir why it was not workin earlier on  ythe sign up page  ab gulp mein kuch new changes aaye h so
//    ok now it will work? see its working
// ok 1 sec
// this?  bro jb login honge tb na ye convert krega so isliye ye error show ho rha h .. ye koi prob ni h ok
// ok i get it now thanx rate well :)

// empty the public/assets directory
gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets');
    done();
});