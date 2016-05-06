'use strict';

var gulp = require('gulp'),
    rimraf = require('rimraf'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify');

var paths = {
    webroot: './wwwroot/'
};

paths.js = paths.webroot + 'js/**/*.js';
paths.minJs = paths.webroot + 'js/**/*.min.js';
paths.css = paths.webroot + 'css/**/*.css';
paths.minCss = paths.webroot + 'css/**/*.min.css';
paths.concatJsDest = paths.webroot + 'js/site.min.js';
paths.concatCssDest = paths.webroot + 'css/site.min.css';

gulp.task('clean:js', function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task('clean:css', function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task('clean', ['clean:js', 'clean:css']);

gulp.task('min:js', function () {
    return gulp.src([paths.js, '!' + paths.minJs], {base: '.'})
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest('.'));
});

gulp.task('min:css', function () {
    return gulp.src([paths.css, '!' + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest('.'));
});

gulp.task('min', ['min:js', 'min:css']);

var gulpprint = require('gulp-print');
var gulpjshint = require('gulp-jshint');
var gulpjscs = require('gulp-jscs');
var gulputil = require('gulp-util');
var browserSync = require('browser-sync');
var gulpinject = require('gulp-inject');
var gulpif = require('gulp-if');
var gulporder = require('gulp-order');
var gulptasklisting = require('gulp-task-listing');
var gulpeslint = require('gulp-eslint');

/**
 * Config
 */
var config = {
    rootDirectory: 'wwwroot',
    bowerDirectory: 'wwwroot/lib',
    index: 'wwwroot/index.html',
    specsDirectory: 'wwwroot/specs',
    specsFile: 'wwwroot/specs/index.html',
    js: [
        'wwwroot/app/**/*.js'
    ],
    jsOrder: [
        //'wwwroot/**/*.js',
        'wwwroot/app/app.js',
        'wwwroot/app/**/*.js',
        'wwwroot/lib/jasmine-core/**/*.js',
        'wwwroot/lib/angular-mocks/**/*.js',
        'wwwroot/specs/**/*.js'
    ],
    specs: [
        'wwwroot/specs/**/*.js'
    ],
    alljs: [
        './*.js',
        './wwwroot/**/*.js',
        '!./wwwroot/lib/**/*.js'
    ],
    css: ['wwwroot/css/**/*.css'],
    wiredepDefaultOptions: {
        //bowerJson: require('./bower.json'),
        //directory: 'wwwroot/lib'
        //ignorePath: '../..'
        //devDependencies: true,
        //'overrides': {
        //    'angular-ui': {
        //        'main': 'dist/XXXXXXXXXXXXXXXXXXXXXXXXXXXXX.js'
        //    }
        //}
    }
};

/**
 * List the available gulp tasks
 */
gulp.task('help', gulptasklisting);
gulp.task('default', ['help']);

gulp.task('dev', function() {
	browserSync.init({
		notify: false,
		port: 8000,
		server: {
			baseDir: ['wwwroot'],
	 		routes: { 
				'/bower_components' : 'bower_components', 
			}
		}
	});
	gulp.watch(['wwwroot/**/*.*'])
		.on('change', browserSync.reload);
});

gulp.task('analyse', function () {
    log('Analyzing source with ESLint');
    return gulp
        .src(config.alljs)
        .pipe(gulpeslint())
        .pipe(gulpeslint.format());
});

/**
 * vet the code and create coverage report
 * @return {Stream}
 */
gulp.task('vet', function () {
    log('Analyzing source with JSHint and JSCS');

    return gulp
        .src(config.alljs)
        //.pipe(gulpprint())
        .pipe(gulpjshint())
        .pipe(gulpjshint.reporter('jshint-stylish', { verbose: true }))
        .pipe(gulpjshint.reporter('fail'))
        .pipe(gulpjscs());
});

gulp.task('jscs', function () {
    log('Analyzing source with JSCS');

    return gulp
        .src(config.alljs)
        .pipe(gulpjscs());
});

/**
 * Run specs once and exit
 * To start servers and run midway specs as well:
 *    gulp test --startServers
 * @return {Stream}
 */
gulp.task('test', function (done) {
    log('run unit tests');
    runKarmaTests(true /*singleRun*/, done);
});

/**
 * Run specs and wait.
 * Watch for file changes and re-run tests on each change
 * To start servers and run midway specs as well:
 *    gulp autotest --startServers
 */
gulp.task('autotest', function (done) {
    log('auto-rerun unit tests');
    runKarmaTests(false /*singleRun*/, done);
});

gulp.task('test-browser', function() {
    log('auto-run unit tests in browser');
    browserSync.init({
		notify: false,
		port: 8081,
		server: {
		    baseDir: ['wwwroot/specs', 'wwwroot'],
			routes: {  
				// '/bower_components' : 'bower_components' 
			}
		}
	});
	gulp.watch(['wwwroot/**/*.*'])
		.on('change', browserSync.reload);
});

gulp.task('test-reports', ['test'], function() {
    log('package unit test reports');
    return gulp.src(['test-reports/coverage/**'])
        .pipe(gulpzip('test-reports.zip'))
        .pipe(gulp.dest('report'));
});

/**
 * Wire-up the bower dependencies
 * @return {Stream}
 */
gulp.task('wiredep', function () {
    log('Wiring the bower dependencies into the html');
    var wiredep = require('wiredep').stream;

    //a.on('data', function (chunk) {
    //    var contents = chunk.contents.toString().trim();
    //    var bufLength = process.stdout.columns;
    //    var hr = '\n\n' + Array(bufLength).join('_') + '\n\n'
    //    if (contents.length > 1) {
    //        process.stdout.write(chunk.path + '\n' + contents + '\n');
    //        process.stdout.write(chunk.path + hr);
    //    }
    //});

    return gulp
        .src(config.index)
        .pipe(wiredep())
        .pipe(inject(config.js, 'js', config.jsOrder))
        .pipe(inject(config.css, 'css'))
        .pipe(gulp.dest(config.rootDirectory));
});

gulp.task('wiredep-test', function () {
    log('Wiring the bower dependencies into the html');
    var wiredep = require('wiredep').stream;
    return gulp
        .src(config.specsFile)
        .pipe(wiredep({ devDependencies: true }))
        .pipe(inject(config.js.concat(config.specs), 'js', config.jsOrder))
        .pipe(inject(config.css, 'css'))
        .pipe(gulp.dest(config.specsDirectory));
});

/**
 * Start the tests using karma.
 * @param  {boolean} singleRun - True means run once and end (CI), or keep running (dev)
 * @param  {Function} done - Callback to fire when karma is done
 * @return {undefined}
 */
function runKarmaTests(singleRun, done) {
    var karma = require('karma').server;

    var karmaOptions = {
        configFile: __dirname + '/karma.conf.js',
        singleRun: !!singleRun
    };

    karma.start(karmaOptions, karmaCompleted);

    function karmaCompleted(karmaResult) {
        log('Karma completed');
        if (karmaResult === 1) {
            done('karma: tests failed with code ' + karmaResult);
        } else {
            done();
        }
    }
}

/**
 * Inject files in a sorted sequence at a specified inject label
 * @param   {Array} src   glob pattern for source files
 * @param   {String} label   The label name
 * @param   {Array} order   glob pattern for sort order of the files
 * @returns {Stream}   The stream
 */
function inject(src, label, order) {
    var options = {
        read: false,
        //ignorePath: 'wwwroot/',
        addRootSlash: false,
        relative: true
    };
    if (label) {
        //  options.name = 'inject:' + label;
        //options.name = label;
    }

    return gulpinject(orderSrc(src, order), options);
}

/**
 * Order a stream
 * @param   {Stream} src   The gulp.src stream
 * @param   {Array} order Glob array pattern
 * @returns {Stream} The ordered stream
 */
function orderSrc(src, order) {
    return gulp
        .src(src)
        .pipe(gulpif(order, gulporder(order)));
}

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                gulputil.log(gulputil.colors.blue(msg[item]));
            }
        }
    } else {
        gulputil.log(gulputil.colors.blue(msg));
    }
}
