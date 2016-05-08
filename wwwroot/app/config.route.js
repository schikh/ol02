(function () {
    'use strict';

    var app = angular.module('app');

    app.config(['$stateProvider', '$urlRouterProvider', 
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('home', {
                    url: '/',
                    views: {
                        '@': { templateUrl: 'app/welcomeView.html' }
                    }
                })
                
                .state('ol1', {
                    //abstract: true,
                    url: '/ol1',
                    views: {
                        '@': { 
                            templateUrl: 'app/ol1/frame.html',
                            controller: 'mapCtrl as vm2'
                        }
                    }
                })                
               
                .state('ol1.2', {
                    url: '/ol1.2',
                    views: {
                        '@': {
                            templateUrl: 'app/ol1/ol12EditView.html',
                            controller: 'ol12EditCtrl as vm'
                        }
                    }
                })
                // .state('ngeoSchema', {
                //     url: '/ngeoSchema',
                //     views: {
                //         '@': {
                //             templateUrl: 'app/ngeoSchema/ngeoSchemaEditView.html',
                //             controller: 'ngeoSchemaEditCtrl as vm'
                //         }
                //     }
                // })
                // .state('basicSchema', {
                //     url: '/basicSchema',
                //     views: {
                //         '@': {
                //             templateUrl: 'app/basicSchema/basicSchemaEditView.html',
                //             controller: 'basicSchemaEditCtrl as vm'
                //         }
                //     }
                // })
                .state('customerList', {
                    url: '/customers',
                    views: {
                        '@': {
                            templateUrl: 'app/customers/customerListView.html',
                            controller: 'customerListCtrl as vm'
                        },
                        'side-nav@': { templateUrl: 'app/customers/customerListSideBar.html' }
                    }
                })
                .state('customerList.customerEdit', {
                    url: '/edit/:customerId',
                    views: {
                        '@': {
                            templateUrl: 'app/customers/customerEditView.html',
                            controller: 'customerEditCtrl as vm',
                            resolve: {
                                customerResource: 'customerResource',
                                customer: function (customerResource, $stateParams) {
                                    var customerId = $stateParams.customerId;
                                    return customerResource.get({ customerId: customerId }).$promise;
                                }
                            }
                        },
                        'side-nav@': { templateUrl: 'app/customers/customerListSideBar.html' }
                    }
                });
            $urlRouterProvider.otherwise('/');
        }
    ]);

    app.run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]);
})();