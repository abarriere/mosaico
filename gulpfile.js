'use strict';

var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var lazypipe    = require('lazypipe');
var del         = require('del');
var merge       = require('merge-stream');
var args        = require('yargs').argv;
var isDev       = args.prod !== true;

var cyan        = require('chalk').cyan;
console.log(cyan('build with env', isDev ? 'dev' : 'prod'));

function onError(err) {
  $.util.beep();
  if (err.annotated)      { $.util.log(err.annotated); }
  else if (err.message) { $.util.log(err.message); }
  else                  { $.util.log(err); }
  return this.emit('end');
}

////////
// CSS
////////

var autoprefixer  = require('autoprefixer');
var csswring      = require('csswring');

var cssDev        = lazypipe()
  .pipe($.sourcemaps.write)
  .pipe(gulp.dest, 'dist')
  .pipe(reload, {stream: true});

var cssProd       = lazypipe()
  .pipe($.postcss, [csswring({ removeAllComments: true })])
  .pipe(gulp.dest, 'dist');

gulp.task('clean-css', function (cb) {
  if (isDev) return cb();
  return del(['dist/*.css', 'dist/*.css.map'], cb);
});

gulp.task('css', ['clean-css'], function () {
  return gulp.src('src/css/badsender*.less')
    .pipe($.if(isDev, $.plumber(onError)))
    .pipe($.sourcemaps.init())
    .pipe($.less())
    .pipe($.postcss([
        autoprefixer({ browsers: ['ie 10', 'last 2 versions'], }),
      ]))
    .pipe($.if(isDev, cssDev(), cssProd()));
});

////////
// JS
////////

var mainBowerFiles  = require('main-bower-files');

gulp.task('clean-lib', function (cb) {
  if (isDev) return cb();
  return del('dist/lib/', cb);
});

gulp.task('lib', ['clean-lib'], function () {

  // used in home and editor
  var mainLibs   = gulp
    .src(mainBowerFiles({ group:  'main', }))
    .pipe($.concat('badsender-lib-core.js'));

  // editor's only
  var editorLibs = gulp
    .src(mainBowerFiles({
      group:  'editor',
      overrides: {
        // tinymce has no main…
        tinymce: {
          main: 'tinymce.js'
        }
      }
    }))

    .pipe($.filter(['*', '!*.css', '!jquery.js', '!knockout.js']))
    .pipe($.order([
      // reorganize files we want to concat
      'jquery-ui*.js',
      'jquery.fileupload.js',
      'jquery.fileupload-process.js',
      'jquery.fileupload-image.js',
      'jquery.fileupload-validate.js',
      '*.js',
    ]))
    .pipe($.concat('badsender-lib-editor.js'));

  // only copy necessary tinymce plugins
  var tinymce = gulp.src([
    'bower_components/tinymce/themes/modern/theme.js',
    'bower_components/tinymce/plugins/paste/plugin.js',
    'bower_components/tinymce/plugins/link/plugin.js',
    'bower_components/tinymce/plugins/hr/plugin.js',
    'bower_components/tinymce/plugins/lists/plugin.js',
    'bower_components/tinymce/plugins/textcolor/plugin.js',
    'bower_components/tinymce/plugins/code/plugin.js',
  ], { base: 'bower_components/tinymce' })

  return merge(mainLibs, editorLibs, tinymce)
    // .pipe($.uglify());
    .pipe(gulp.dest('dist/lib'));
});

////////
// DEV
////////

var init = true;
gulp.task('nodemon', function (cb) {
  return $.nodemon({
    script: 'index.js',
    ext: 'js json',
    watch: ['server/*.js', '.badsenderrc', 'index.js'],
    env:    {
      'NODE_ENV': isDev ? 'development' : 'production',
      'pioc': 'clapou',
    }
  }).on('start', function () {
    // https://gist.github.com/sogko/b53d33d4f3b40d3b4b2e#comment-1457582
    if (init) {
      init = false;
      cb();
    }
  });
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init({
    proxy: 'http://localhost:3000',
    open: false,
    port: 7000,
    ghostMode: false,
  });
});

gulp.task('dev', ['browser-sync'], function () {
  gulp.watch(['server/views/*.jade', 'dist/*.js']).on('change', reload);
  gulp.watch('src/css/**/*.less', ['css']);
});
