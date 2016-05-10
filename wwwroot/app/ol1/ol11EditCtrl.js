(function () {
    "use strict";

    angular.module('ngeoSchemaModule')
        .value('ol', ol);

    angular.module('ngeoSchemaModule')
        .factory('mapService', ['ol', function (ol) {
            return {
                getInstance: function () {
                    return new service();
                }
            }

            function service() {
                var map;
                var addinteraction;

                this.initialize = function (divElement) {
                    map = new ol.Map({
                        target: divElement
                    });
                    ol11EditCtrl(null, ol, map);
                };

                this.drawingInteractionActive = function () {
                    return _.some(map.getInteractions().getArray(),  function(obj) {
                        return obj instanceof ol.interaction.Draw; 
                    });
                };

                this.toggleDrawingInteraction = function () {
                    if (addinteraction == null) {
                        addinteraction = createInteraction();
                    }
                    console.log(this.drawingInteractionActive());
                    if(this.drawingInteractionActive()){
                        map.removeInteraction(addinteraction);
                    }
                    else {
                        map.addInteraction(addinteraction);
                    }
                };
            }

            function createInteraction() {
                var draw = new ol.interaction.Draw({
                    type: 'LineString',
                    style: new ol.style.Style({
                        image: new ol.style.RegularShape({
                            stroke: new ol.style.Stroke({ color: 'red', width: 1 }),
                            points: 4,
                            radius: 30,
                            radius2: 0,
                            angle: 0
                        }),
                        stroke: new ol.style.Stroke({
                            color: 'red',
                            width: 1
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 0, 0, 0.3)'
                        })
                    }),
                    active: false
                });
                return draw;
            }
        }]);

    angular.module('ngeoSchemaModule')
        .controller('mapCtrl', ['$scope', 'mapService', function ($scope, mapService) {
            var vm = this;
            vm.mapService = mapService.getInstance();
            vm.name = 'mapCtrl';
        }]);

    angular.module('ngeoSchemaModule')
        .directive('swMap', ['ol', function (ol) {
            return {
                restrict: 'E',
                transclude: true,
                scope: { mapService: '=' },
                templateUrl: 'swMap.html',
                compile: function () {
                    return {
                        pre: function (scope, element, attributes, controller) {
                            var div = element[0].querySelector('div');
                            scope.mapService.initialize(div);
                        },
                        post: function (scope) {
                        }
                    }
                }
            }
        }]);

    angular.module('ngeoSchemaModule')
        .directive('swDrawingInteraction', ['ol', function (ol) {
            return {
                restrict: "E",
                scope: { mapService: '=' },
                link: function (scope, element, attributes, swMap) {
                    scope.mapService.toggleDrawingInteraction();
                }
            };
        }]);

    function ol11EditCtrl($scope, ol, map) {
        var vm = $scope;

        var format = new ol.format.TopoJSON();
        var tileGrid = ol.tilegrid.createXYZ({ maxZoom: 19 });
        var roadStyleCache = {};
        var roadColor = {
            'path': 'pink',
            'major_road': 'green',
            'minor_road': 'bleu',
            'highway': 'red'
        };
        var landuseStyleCache = {};
        var buildingStyle = new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#666',
                opacity: 0.4
            }),
            stroke: new ol.style.Stroke({
                color: '#444',
                width: 1
            })
        });

        var sourceVector = new ol.source.VectorTile({
            format: format,
            tileGrid: tileGrid,
            url: 'http://{a-c}.tile.openstreetmap.us/vectiles-highroad/{z}/{x}/{y}.topojson'
        });
        var layers = [
            // new ol.layer.Tile({
            //   source: new ol.source.OSM()
            // }),
            // new ol.layer.VectorTile({
            //   source: new ol.source.VectorTile({
            //     format: format,
            //     tileGrid: tileGrid,
            //     url: 'http://{a-c}.tile.openstreetmap.us/vectiles-water-areas/{z}/{x}/{y}.topojson'
            //   }),
            //   style: new ol.style.Style({
            //     fill: new ol.style.Fill({
            //       color: '#9db9e8'
            //     })
            //   })
            // }),
            new ol.layer.VectorTile({
                source: sourceVector,
                style: function (feature) {
                    var kind = feature.get('kind');
                    var railway = feature.get('railway');
                    var sort_key = feature.get('sort_key');
                    var styleKey = kind + '/' + railway + '/' + sort_key;
                    var style = roadStyleCache[styleKey];
                    if (!style) {
                        var color, width;
                        if (railway) {
                            color = 'red';
                            width = 1;
                        } else {
                            color = roadColor[kind];
                            width = kind == 'highway' ? 1.5 : 1;
                        }
                        style = new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: color,
                                width: width
                            }),
                            zIndex: sort_key
                        });
                        roadStyleCache[styleKey] = style;
                    }
                    return style;
                }
            })
            // new ol.layer.VectorTile({
            //   source: new ol.source.VectorTile({
            //     format: format,
            //     tileGrid: tileGrid,
            //     url: 'http://{a-c}.tile.openstreetmap.us/vectiles-buildings/{z}/{x}/{y}.topojson'
            //   }),
            //   style: function(f, resolution) {
            //     return (resolution < 10) ? buildingStyle : null;
            //   }
            // })
            // new ol.layer.VectorTile({
            //   source: new ol.source.VectorTile({
            //     format: format,
            //     tileGrid: tileGrid,
            //     url: 'http://{a-c}.tile.openstreetmap.us/vectiles-land-usages/{z}/{x}/{y}.topojson'
            //   }),
            //   visible: false,
            //   style: function(feature) {
            //     var kind = feature.get('kind');
            //     var styleKey = kind;
            //     var style = landuseStyleCache[styleKey];
            //     if (!style) {
            //       var color, width;
            //       color = {
            //         'parking': '#ddd',
            //         'industrial': '#aaa',
            //         'urban area': '#aaa',
            //         'park': '#76C759',
            //         'school': '#DA10E7',
            //         'garden': '#76C759',
            //         'pitch': '#D58F8D',
            //         'scrub': '#3E7D28',
            //         'residential': '#4C9ED9'
            //       }[kind];
            //       width = kind == 'highway' ? 1.5 : 1;
            //       style = new ol.style.Style({
            //         stroke: new ol.style.Stroke({
            //           color: color,
            //           width: width
            //         }),
            //         fill: new ol.style.Fill({
            //           color: color,
            //           opacity: 0.5
            //         })
            //       });
            //       landuseStyleCache[styleKey] = style;
            //     }
            //     return style;
            //   }
            // })
        ];

        layers.forEach(function (layer) {
            map.addLayer(layer);
        });

        var view = new ol.View({
            center: ol.proj.transform([4.8667, 50.4667], 'EPSG:4326', 'EPSG:3857'),
            zoom: 15
        })
        map.setView(view);

        map.on('pointermove', function (e) {
            // vm.position = ol.proj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
            // $scope.$apply();


            //   feature = null;
            //   var features = someLayer.getSource().getFeaturesAtCoordinate(evt.coordinate);
            //   if (features.length) {
            //     feature = features[0];
            //   }
        });

        map.on("click", function (e) {
            return;
            // map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
            //     var x = 0;
            // });
            var oo;
            //var clicked = e.selected[0];
            var closest = sourceVector.getClosestFeatureToCoordinate(e.coordinate);
            var closestType = closest.getType();
            if (closestType === 'Point') {
                oo = e.selected[0].getGeometry().getCoordinates();
            }
            else {
                var aa = e.selected[0].getGeometry().getExtent();
                oo = ol.extent.getCenter(aa);

            }
            console.log(closest);
            console.log(oo);
        });








        // The features are not added to a regular vector layer/source,
        // but to a feature overlay which holds a collection of features.
        // This collection is passed to the modify and also the draw
        // interaction, so that both can add or modify features.
        var features = new ol.Collection();
        var featureOverlay = new ol.layer.Vector({
            source: new ol.source.Vector({ features: features }),
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(0, 0, 255, 0.3)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'blue',
                    width: 1
                })
            })
        });
        featureOverlay.setMap(map);

        var modify = new ol.interaction.Modify({
            features: features,
            style: new ol.style.Style(),
            // the SHIFT key must be pressed to delete vertices, so
            // that new vertices can be drawn at the same position
            // of existing vertices
            deleteCondition: function (event) {
                return ol.events.condition.shiftKeyOnly(event) &&
                    ol.events.condition.singleClick(event);
            }
        });
        map.addInteraction(modify);

        // var select = new ol.interaction.Select({
        //   layers: [layers[0]]
        // });

        // map.addInteraction(select);
    }
}());