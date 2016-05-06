describe('customerResource service', function () {
    var $httpBackend;
  
    beforeEach(angular.mock.module('customerManagement'));

    beforeEach(function () {
        angular.mock.inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
            var customers = getCustomers();
            $httpBackend.when('GET', 'app/welcomeView.html').respond('<html><body></body></html>');
            $httpBackend.when('GET', '/api/customers').respond(customers);
            $httpBackend.when('GET', '/api/customers/1').respond(customers[0]);
            $httpBackend.when('GET', '/api/customers/2').respond(customers[1]);
            //$httpBackend.expectPOST('/add-msg.py', 'message content').respond(201, '');
        });
    });

    it('query returns list of customers', angular.mock.inject(function(customerResource) {
        var result;
        customerResource.query(function (data) {
            result = data;
        });
        $httpBackend.flush();
        expect(result[0].customerName).toEqual('Customer1');
        expect(result.length).toEqual(2);
    }));
    
    it('get returns the customer for the given id', angular.mock.inject(function(customerResource) {
        var customer1, customer2;
        customerResource.get({ customerId: 1 }).$promise.then(function (data) {
            customer1 = data;
        });
        customerResource.get({ customerId: 2 }).$promise.then(function (data) {
            customer2 = data;
        });
        $httpBackend.flush();

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
