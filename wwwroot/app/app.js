(function () {
    'use strict';

    var app = angular.module('app', [
            'ui.bootstrap',
            'customerManagement',
            'customerResourceMock',
            //'ngResource',
            //'ui.mask',
            'ngeoSchemaModule',
            'ui.router',
            'ngAnimate'
            ]);
            
    angular.module('customerManagement', ['ngResource']);
    //var basicSchema = angular.module("basicSchema", ["openlayers-directive"]);
    //var ngeoSchemaModule = angular.module("ngeoSchemaModule", ["ngeo"]);  
    var ngeoSchemaModule = angular.module('ngeoSchemaModule', []);  
        
    app.config(function ($provide) {
        $provide.decorator('$exceptionHandler',
            ['$delegate',
                function ($delegate) {
                    return function (exception, cause) {
                        exception.message = 'Please contact the Help Desk! \n Message: ' +
                            exception.message;
                        $delegate(exception, cause);
                        alert(exception.message);
                    };
                }]);
    });
}());
