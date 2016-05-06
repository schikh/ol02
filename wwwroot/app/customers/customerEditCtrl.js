(function () {
    'use strict';

    angular
        .module('customerManagement')
        .controller('customerEditCtrl', ['customer', '$state', customerEditCtrl]);
     
    function customerEditCtrl(customer, $state) {
        var vm = this;

        vm.customer = customer;

        if (vm.customer && vm.customer.customerId) {
            vm.title = 'Edit: ' + vm.customer.customerName;
        }
        else {
            vm.title = 'New customer';
        }

        vm.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = !vm.opened;
        };

        vm.submit = function (isValid) {
            if (isValid) {
                vm.customer.$save(function(data) {
                    toastr.success('Save Successful');
                });
            }
            else {
                alert('Please correct the validation errors first.');
            }
        };

        vm.cancel = function () {
            $state.go('customerList');
        };
    }
}());
