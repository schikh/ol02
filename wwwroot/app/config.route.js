(function () {
    'use strict';

    var app = angular.module('app');

    //app.constant('routes', getRoutes());

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
                            templateUrl: 'app/ol1/ol1frame.html'
                        }
                    }
                })                
                .state('ol1.x', {
                    url: '/x',
                    views: {
                        'sidebar': {
                            templateUrl: 'app/ol1/sidebar.html',
                            controller: 'sidebar as vm'
                        },
                        'layerbar': {
                            templateUrl: 'app/ol1/layerbar.html',
                            controller: 'layerbar as vm'
                        },
                        'map': {
                            templateUrl: 'app/ol1/map.html',
                            controller: 'ol11EditCtrl as vm'
                        },                       
                        'toolbar': {
                            templateUrl: 'app/ol1/toolbar.html',
                            controller: 'toolbar as vm'
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