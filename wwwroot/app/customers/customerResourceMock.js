(function () {
   'use strict';

   var app = angular.module('customerResourceMock', ['ngMockE2E']);

   app.run(function ($httpBackend) {
       var customers = [
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
           },
           {
               'customerId': 5,
               'customerName': 'Customer3',
               'entryDate': 'May 21, 2013',
               'address': 'Curved claw steel hammer',
           },
           {
               'customerId': 8,
               'customerName': 'Customer4',
               'entryDate': 'May 15, 2009',
               'address': '15-inch steel blade hand saw',
           },
           {
               'customerId': 10,
               'customerName': 'Customer5',
               'entryDate': 'October 15, 2002',
               'address': 'Standard two-button video game controller',
           }
       ];

       var customerUrl = '/api/customers';

       $httpBackend.whenGET(customerUrl).respond(customers);

       var editingRegex = new RegExp(customerUrl + '/[0-9][0-9]*', '');

       $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
           var customer = { 'customerId': 0 };
           var parameters = url.split('/');
           var length = parameters.length;
           var id = parameters[length - 1];

           if (id > 0) {
               for (var i = 0; i < customers.length; i++) {
                   if (customers[i].customerId == id) {
                       customer = customers[i];
                       break;
                   }
               };
           }
           return [200, customer, {}];
       });

       $httpBackend.whenPOST(customerUrl).respond(function(method, url, data) {
           var customer = angular.fromJson(data);
           if (!customer.customerId) {
               // new customer Id
               customer.customerId = customers[customers.length - 1].customerId + 1;
               customers.push(customer);
           } else {
               // Updated customer
               for (var i = 0; i < customers.length; i++) {
                   if (customers[i].customerId == customer.customerId) {
                       customers[i] = customer;
                       break;
                   }
               };
           }
           return [200, customer, {}];
       });

       // Pass through any requests for application files
       $httpBackend.whenGET(/app/).passThrough();
   });
}());
