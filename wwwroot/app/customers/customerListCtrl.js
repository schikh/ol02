(function () {
    'use strict';
    angular.module('customerManagement')
        .controller('customerListCtrl', ['customerResource', customerListCtrl]);

    function customerListCtrl(customerResource) {

        var vm = this;
        vm.customers = [];

        customerResource.query(function (data) {
            vm.customers = data;
        });
    }
} ());