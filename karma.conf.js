module.exports = function (config) {
     
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        // list of files to exclude
        exclude: ['karma.config.js'],

        // proxies: {
        //     '/': 'http://localhost:8888/'
        // },

        // // preprocess matching files before serving them to the browser
        // // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        // preprocessors: gulpConfig.karma.preprocessors,
        preprocessors : {
            'wwwroot/app/**/*.js': 'coverage'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress', 'coverage'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec', 'coverage'],

        coverageReporter : {
            type: 'html',
            dir: 'test-reports/coverage/',
            reporters: [
                    { type: 'html', subdir: 'report-html' },
                    { type: 'text' }
            ]
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
        // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        plugins: ['karma-jasmine',
            'karma-coverage',
            'karma-phantomjs-launcher',
            'karma-spec-reporter'],

        // frameworks to use
        // some available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //        browsers: ['Chrome', 'ChromeCanary', 'FirefoxAurora', 'Safari', 'PhantomJS'],
        browsers: ['PhantomJS'],

        // list of files / patterns to load in the browser
        files: [
                'wwwroot/lib/jquery/dist/jquery.js',
                'wwwroot/lib/angular/angular.js',
                'wwwroot/lib/angular-resource/angular-resource.js',
                'wwwroot/lib/angular-ui-router/release/angular-ui-router.js',
                'wwwroot/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                'wwwroot/lib/angular-sanitize/angular-sanitize.min.js',
                'wwwroot/lib/angular-mocks/angular-mocks.js',
                'wwwroot/lib/toastr/toastr.js',
                'wwwroot/lib/bootstrap/dist/js/bootstrap.js',
                'wwwroot/lib/lodash/lodash.js',
                'wwwroot/app/**/*.js',
                'wwwroot/specs/**/*.spec.js'
               ]
    });
};