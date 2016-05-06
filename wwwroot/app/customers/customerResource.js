(function () {
    'use strict';

    var module = angular.module('customerManagement');

    module.factory('customerResource', ['$resource', customerResource]);

    function customerResource($resource) {
        return $resource('/api/customers/:customerId');
    }

}());
