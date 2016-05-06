describe('customerListCtrl controller', function() {
    var $httpBackend;
    var customerListCtrl;

    beforeEach(angular.mock.module('customerManagement'));

    beforeEach(function() {
        angular.mock.inject(function($injector, $controller, customerResource) {
            $httpBackend = $injector.get('$httpBackend');
            var customers = getCustomers();
            $httpBackend.when('GET', 'app/welcomeView.html').respond('<html><body></body></html>');
            $httpBackend.when('GET', '/api/customers').respond(customers);

            customerListCtrl = $controller('customerListCtrl', { customerResource: customerResource });
        });
    });

    it('customerListCtrl provides list of customers', angular.mock.inject(function() {
        $httpBackend.flush();
        var customers = customerListCtrl.customers;
        var customer1 = customers[0];
        var customer2 = customers[1];
        expect(customers.length).toEqual(2);
        expect(customer1.customerName).toEqual('Customer1');
        expect(customer2.customerName).toEqual('Customer2');
    }));

    function getCustomers() {
        return [
            {
                'customerId': 1,
                'customerName': 'Customer1',
                'entryDate': 'March 19, 2009',
                'address': 'Leaf rake with 48-inch wooden handle.'
            },
            {
                'customerId': 2,
                'customerName': 'Customer2',
                'entryDate': 'March 18, 2010',
                'address': '15 gallon capacity rolling garden cart',
            }
        ];
    }
});