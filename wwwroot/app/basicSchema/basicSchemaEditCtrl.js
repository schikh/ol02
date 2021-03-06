  
(function () {
    "use strict";

    angular
        .module("basicSchema")
        .controller("basicSchemaEditCtrl", [ '$scope', '$http', 'olData', basicSchemaEditCtrl]);
        
    function basicSchemaEditCtrl($scope, $http, olData) {
        
        angular.extend($scope, {
            center: {
                lat: 30,
                lon: 0,
                zoom: 2
            },
            layers: [
                {
                    name: 'mapbox',
                    source: {
                        type: 'TileJSON',
                        url: 'http://api.tiles.mapbox.com/v3/mapbox.geography-class.jsonp'
                    }
                },
                {
                    name: 'geojson',
                    source: {
                        type: 'GeoJSON',
                        url: 'json/countries.geo.json'
                    }
                }
            ],
            defaults: {
                events: {
                    layers: [ 'mousemove', 'click' ]
                }
            }
        });
        
        $scope.$on('openlayers.layers.geojson.mousemove', function(event, feature) {
            $scope.$apply(function(scope) {
                if(feature && $scope.countries[feature.getId()]) {
                    $scope.mouseMoveCountry = feature ? $scope.countries[feature.getId()].name : '';
                }
            });
        });
        
        $scope.$on('openlayers.layers.geojson.click', function(event, feature) {
            $scope.$apply(function(scope) {
                if(feature) {
                    $scope.mouseClickCountry = feature ? $scope.countries[feature.getId()].name : '';
                }
            });
        });
        
        // Get the countries data from a JSON
        $http.get("json/all.json").success(function(data, status) {
            // Put the countries on an associative array
            $scope.countries = {};
            for (var i=0; i< data.length; i++) {
                var country = data[i];
                $scope.countries[country['alpha-3']] = country;
            }
        });
    }
}());

