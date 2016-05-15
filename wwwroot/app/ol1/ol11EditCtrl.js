(function () {
    "use strict";

    angular.module('ngeoSchemaModule')
        .value('ol', ol);

    angular.module('ngeoSchemaModule')
        .filter('coordinateFormat', ['ol', function (ol) {
            return function (coordinate) {
                return ol.coordinate.format(coordinate, '{y}, {x}', 4);
            };
        }]);

    angular.module('ngeoSchemaModule')
        .controller('mapCtrl', ['$scope', 'mapService', function ($scope, mapService) {
            var vm = this;
            vm.mapService = mapService.getInstance();
            vm.name = 'mapCtrl';
            vm.pointerCoordinate = null;
            vm.mapService.registerMapPointerCorrdinateChange(function (value) {
                $scope.$apply(function () {
                    vm.pointerCoordinate = value;
                });
            });
        }]);

    angular.module('ngeoSchemaModule')
        .factory('mapService', ['ol', function (ol) {
            return {
                getInstance: function () {
                    return new service();
                }
            }

            function service() {
                var map;
                var drawingLayerFeatures;
                var mapPointerCorrdinateChangeCallBack;

                this.initialize = function (divElement) {
                    map = new ol.Map({
                        target: divElement
                    });

                    var geographicLayers = getGepgraphicLayers();
                    geographicLayers.forEach(function (layer) {
                        map.addLayer(layer);
                    });

                    var view = createView();
                    map.setView(view);

                    drawingLayerFeatures = createDrawingLayerFeatures();

                    var drawingLayer = createDrawingLayer(drawingLayerFeatures);
                    map.addLayer(drawingLayer);

                    var modifyInteraction = createModifyInteraction(drawingLayerFeatures);
                    map.addInteraction(modifyInteraction);

                    registerMapPointerCorrdinateChange(map, ol, function (coordinate) {
                        if (mapPointerCorrdinateChangeCallBack) {
                            mapPointerCorrdinateChangeCallBack(coordinate);
                        }
                    });

                };

                this.registerMapPointerCorrdinateChange = function (callBack) {
                    mapPointerCorrdinateChangeCallBack = callBack;
                };

                this.drawingInteractionActive = function () {
                    return _.some(map.getInteractions().getArray(), function (obj) {
                        return obj instanceof ol.interaction.Draw;
                    });
                };

                this.togglePolygonDrawingInteraction = function () {
                    toggleDrawingInteraction(map, 'Polygon', drawingLayerFeatures);
                };
                
                this.toggleLineStringDrawingInteraction = function () {
                    toggleDrawingInteraction(map, 'LineString', drawingLayerFeatures);
                };
                
                this.togglePointDrawingInteraction = function () {
                    toggleDrawingInteraction(map, 'Point', drawingLayerFeatures);
                };   

                this.toggleCircleDrawingInteraction = function () {
                    toggleDrawingInteraction(map, 'Circle', drawingLayerFeatures);
                };   
            }

            function toggleDrawingInteraction(map, drawingType, drawingLayerFeatures) {
                var interaction = getInteraction(map, ol.interaction.Draw);

                if (interaction) {
                    map.removeInteraction(interaction);
                    console.log('remove interaction');
                    if(interaction.type_ != drawingType) {
                        var drawingInteraction = createDrawingInteraction(drawingLayerFeatures, drawingType);
                        map.addInteraction(drawingInteraction);
                    }
                }
                else {
                    var drawingInteraction = createDrawingInteraction(drawingLayerFeatures, drawingType);
                    map.addInteraction(drawingInteraction);
                }
                
                if (interactionActive(map, ol.interaction.Draw)) {
                }
                else {                    
                }
            };

            function getInteraction(map, interactionType) {
                return _.find(map.getInteractions().getArray(), function (obj) {
                    return obj instanceof interactionType;
                });
            };

            function interactionActive(map, interactionType) {
                return _.some(map.getInteractions().getArray(), function (obj) {
                    return obj instanceof interactionType;
                });
            };

            function registerMapPointerCorrdinateChange(map, ol, callBack) {
                map.on('pointermove', function (e) {
                    var coordinate = ol.proj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
                    callBack(coordinate);
                    //$scope.$apply();


                    //   feature = null;
                    //   var features = someLayer.getSource().getFeaturesAtCoordinate(evt.coordinate);
                    //   if (features.length) {
                    //     feature = features[0];
                    //   }
                });
            }

            function createView() {
                var view = new ol.View({
                    center: ol.proj.transform([4.8667, 50.4667], 'EPSG:4326', 'EPSG:3857'),
                    zoom: 15
                });
                return view;
            }

            function getGepgraphicLayers() {
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
                return layers;
            }

            function createDrawingLayerFeatures() {
                return new ol.Collection();
            }

            function createDrawingLayer(features) {
                var layer = new ol.layer.Vector({
                    source: new ol.source.Vector({ features: features }),
                    style: new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 255, 255, 0.2)'
                        }),
                        stroke: new ol.style.Stroke({
                            color: '#ffcc33',
                            width: 2
                        }),
                        image: new ol.style.Circle({
                            radius: 7,
                            fill: new ol.style.Fill({
                                color: '#ffcc33'
                            })
                        })
                    })
                });
                return layer;
            }

            function createModifyInteraction(features) {
                var interaction = new ol.interaction.Modify({
                    features: features,
                    // the SHIFT key must be pressed to delete vertices, so
                    // that new vertices can be drawn at the same position
                    // of existing vertices
                    deleteCondition: function (event) {
                        return ol.events.condition.shiftKeyOnly(event) &&
                            ol.events.condition.singleClick(event);
                    }
                });
                return interaction;
            }

            function createDrawingInteraction(features, drawingType) {
                var interaction = new ol.interaction.Draw({
                    type: drawingType,
                    features: features,
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
                    active: true
                });
                return interaction;
            }
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
                    scope.mapService.togglePolygonDrawingInteraction();
                }
            };
        }]);


    function ol11EditCtrl($scope, ol, map) {

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




    }
} ());
