(function () {
    "use strict";

    angular
        .module("ngeoSchemaModule")
        .controller("ol11EditCtrl", ["$scope", ol11EditCtrl]);

    function ol11EditCtrl($scope) {
        var vm = this;

        //     var tiledRaster = new ol.layer.Tile({
        //       source: new ol.source.OSM()
        //     });

        //     var center = ol.proj.transform([4.8667, 50.4667], 'EPSG:4326', 'EPSG:3857');

        //     var view = new ol.View({
        //       center: center,
        //       zoom: 15,
        //     });

        //     // var map = new ol.Map({
        //     //   target: 'map',
        //     //   layers: [tiledRaster],
        //     //   view: view
        //     // });

        //     // vm.map = map;

        //     // return;

        //     var fill = new ol.style.Fill({
        //       color: 'rgba(0,0,0,0.2)'
        //     });
        //     var stroke = new ol.style.Stroke({
        //       color: 'rgba(0,0,0,0.4)'
        //     });
        //     var circle = new ol.style.Circle({
        //       radius: 6,
        //       fill: fill,
        //       stroke: stroke
        //     });
        //     var vectorStyle = new ol.style.Style({
        //       fill: fill,
        //       stroke: stroke,
        //       image: circle
        //     });

        //     var vectorLoader = function (extent, resolution, projection) {
        //       var url = 'http://demo.boundlessgeo.com/geoserver/wfs?service=WFS&' +
        //         'version=1.1.0&request=GetFeature&typename=osm:builtup_area&' +
        //         'outputFormat=text/javascript&format_options=callback:loadFeatures' +
        //         '&srsname=EPSG:3857&bbox=' + extent.join(',') + ',EPSG:3857';
        //       $.ajax({
        //         url: url,
        //         dataType: 'jsonp'
        //       });
        //     };

        //     var loadFeatures = function (response) {
        //       var features = vectorSource.readFeatures(response);
        //       vectorSource.addFeatures(features);
        //     };

        //     var vectorSource = new ol.source.ServerVector({
        //       format: new ol.format.GeoJSON(),
        //       loader: vectorLoader,
        //       strategy: ol.loadingstrategy.createTile(new ol.tilegrid.XYZ({
        //         maxZoom: 19
        //       })),
        //       projection: 'EPSG:3857',
        //     });

        //     var serverVector = new ol.layer.vector({
        //       source: vectorSource,
        //       style: vectorStyle
        //     });

        //     vm.map = new ol.Map({
        //       renderer: 'canvas',
        //       target: 'map',
        //       layers: [tiledRaster, serverVector],
        //       view: view
        //     });








        // //     var layer = new ol.layer.Tile({
        // //       source: new ol.source.OSM(),
        // //       // opacity: 0.8,
        // //       brightness: 1
        // //     });

        // //     var interaction = new ol.interaction.DragRotateAndZoom();
        // //     var control = new ol.control.FullScreen();
        // //     var center = ol.proj.transform([4.8667, 50.4667], 'EPSG:4326', 'EPSG:3857');

        // //     // var overlay = new ol.Overlay({
        // //     //   element: document.getElementById('overlay'),
        // //     //   positioning: 'bottom-center'
        // //     // });

        // //     var view = new ol.View({
        // //       center: center,
        // //       zoom: 15
        // //     });

        // //     vm.map = new ol.Map({
        // //       target: 'map',
        // //       layers: [layer],
        // //       // interactions: [interaction],
        // //       controls: [control],
        // //       // overlays: [overlay],
        // //       view: view,
        // //       renderer: 'dom'
        // //     });

        // //     // var map = new ol.Map();
        // //     // map.addInteraction(interaction);
        // //     // map.addControl(control);

        // //     vm.mapClick = function (event) {
        // //       var coord = event.coordinate;
        // //       var degrees = ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326')
        // //       var hdms = ol.coordinate.toStringHDMS(degrees);
        // //       var element = overlay.getElement();
        // //       element.innerHTML = hdms;
        // //       overlay.setPosition(coord);
        // //       vm.map.addOverlay(overlay);
        // //     };

        // // //    vm.map.on("click", vm.mapClick);

        // //     // var visible = new ol.dom.Input(document.getElementById('visible'));
        // //     // visible.bindTo('checked', layer, 'visible');

        // //     // var checkbox = document.getElementById('visible');
        // //     // checkbox.addEventListener('change', function () {
        // //     //   var checked = this.checked;
        // //     //   if (checked !== layer.getVisible()) {
        // //     //     layer.setVisible(checked);
        // //     //   }
        // //     // });

        // //     // vm.visibleChecked = true;

        // //     vm.toggleSync = function (item) {
        // //       layer.setVisible(item);
        // //     }

        // //     // layer.on('change:visible', function() {
        // //     //   var visible = this.getVisible();
        // //     //   if (visible !== checkbox.checked) {
        // //     //     checkbox.checked = visible;
        // //     //   }
        // //     // });

        // //     vm.rome = ol.proj.transform([12.5, 41.9], 'EPSG:4326', 'EPSG:3857');

        // //     vm.doBounce = function (location) {
        // //       var bounce = ol.animation.bounce({
        // //         resolution: vm.map.getView().getResolution() * 2
        // //       });
        // //       var pan = ol.animation.pan({
        // //         source: vm.map.getView().getCenter()
        // //       });
        // //       vm.map.beforeRender(bounce);
        // //       vm.map.beforeRender(pan);
        // //       vm.map.getView().setCenter(location);
        // //     }    

        // vm.names = ["Point", "LineString", "Polygon"];
        // vm.type = "Polygon";

        // var raster = new ol.layer.Tile({
        //   source: new ol.source.OSM()
        // });

        // var features = new ol.Collection();
        // var featureOverlay = new ol.layer.Vector({
        //   source: new ol.source.Vector({features: features}),
        //   style: new ol.style.Style({
        //     fill: new ol.style.Fill({
        //       color: 'rgba(255, 255, 255, 0.2)'
        //     }),
        //     stroke: new ol.style.Stroke({
        //       color: '#ffcc33',
        //       width: 2
        //     }),
        //     image: new ol.style.Icon({
        //       src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Crosshairs_Red.svg/1024px-Crosshairs_Red.svg.png',
        //       size: [10, 10],
        //       opacity: 1
        //   })
        //     // image: new ol.style.Circle({
        //     //   radius: 7,
        //     //   fill: new ol.style.Fill({
        //     //     color: '#ffcc33'
        //     //   })
        //     // })
        //   })
        // });
        // //featureOverlay.setMap(map);

        // var map = new ol.Map({
        //   layers: [raster, featureOverlay],
        //   target: 'map',
        //   view: new ol.View({
        //     center: ol.proj.transform([4.8667, 50.4667], 'EPSG:4326', 'EPSG:3857'),
        //     zoom: 15
        //   })
        // });



        // var modify = new ol.interaction.Modify({
        //   features: features,
        //   // the SHIFT key must be pressed to delete vertices, so
        //   // that new vertices can be drawn at the same position
        //   // of existing vertices
        //   deleteCondition: function(event) {
        //     return ol.events.condition.shiftKeyOnly(event) &&
        //         ol.events.condition.singleClick(event);
        //   }
        // });
        // map.addInteraction(modify);

        // var draw; // global so we can remove it later
        // var typeSelect = document.getElementById('type');

        // function addInteraction() {
        //   draw = new ol.interaction.Draw({
        //     features: features,
        //     type: /** @type {ol.geom.GeometryType} */ (vm.type)
        //   });
        //   map.addInteraction(draw);
        // }


        // vm.typeChanged = function() {
        //   map.removeInteraction(draw);
        //   addInteraction();
        // };

        // addInteraction();


        /////////////////////////////////////////////////////////////////////////////////////////////
        // var stroke = new ol.style.Stroke({color: 'black', width: 1});
        // var fill = new ol.style.Fill({color: 'red'});

        // var styles = {
        //   'square': [new ol.style.Style({
        //     image: new ol.style.RegularShape({
        //       fill: fill,
        //       stroke: stroke,
        //       points: 4,
        //       radius: 10,
        //       angle: Math.PI / 4
        //     })
        //   })],
        //   'triangle': [new ol.style.Style({
        //     image: new ol.style.RegularShape({
        //       fill: fill,
        //       stroke: stroke,
        //       points: 3,
        //       radius: 10,
        //       rotation: Math.PI / 4,
        //       angle: 0
        //     })
        //   })],
        //   'star': [new ol.style.Style({
        //     image: new ol.style.RegularShape({
        //       fill: fill,
        //       stroke: stroke,
        //       points: 5,
        //       radius: 10,
        //       radius2: 4,
        //       angle: 0
        //     })
        //   })],
        //   'cross': [new ol.style.Style({
        //     image: new ol.style.RegularShape({
        //       fill: fill,
        //       stroke: stroke,
        //       points: 4,
        //       radius: 10,
        //       radius2: 0,
        //       angle: 0
        //     })
        //   })],
        //   'x': [new ol.style.Style({
        //     image: new ol.style.RegularShape({
        //       fill: fill,
        //       stroke: stroke,
        //       points: 4,
        //       radius: 10,
        //       radius2: 0,
        //       angle: Math.PI / 4
        //     })
        //   })]
        // };


        // var styleKeys = ['x', 'cross', 'star', 'triangle', 'square'];
        // var count = 250;
        // var features = new Array(count);
        // var e = 4500000;

        // for (var i = 0; i < count; ++i) {
        //   var coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
        //   features[i] = new ol.Feature(new ol.geom.Point(coordinates));
        //   features[i].setStyle(styles[styleKeys[Math.floor(Math.random() * 5)]]);
        // }

        // var source = new ol.source.Vector({
        //   features: features
        // });

        // var vectorLayer = new ol.layer.Vector({
        //   source: source
        // });

        // var map = new ol.Map({
        //   layers: [
        //     vectorLayer
        //   ],
        //   target: 'map',
        //   view: new ol.View({
        //     center: [0, 0],
        //     zoom: 2
        //   })
        // });

        // vm.map = map;




        // Drag single feature
        // var pointFeature = new ol.Feature(new ol.geom.Point([4.8667, 50.4667]));
        // var pointLayer = new ol.layer.Vector({
        //     source: new ol.source.Vector({
        //         features: [pointFeature]
        //     }),
        //     style: new ol.style.Style({
        //         image: new ol.style.Icon(({
        //             src: 'http://openlayers.org/en/v3.8.2/examples/data/icon.png'
        //         }))
        //     })
        // });

        // var dragInteraction = new ol.interaction.Modify({
        //     features: new ol.Collection([pointFeature]),
        //     style: null
        // });

        // map.addInteraction(dragInteraction)

        // pointFeature.on('change', function () {
        //     console.log('Feature Moved To:' + this.getGeometry().getCoordinates());
        // }, pointFeature);



        var fill = new ol.style.Fill({
            color: 'rgba(0,0,0,0.2)'
        });
        var stroke = new ol.style.Stroke({
            color: 'rgba(0,0,0,0.4)'
        });
        var circle = new ol.style.Circle({
            radius: 6,
            fill: fill,
            stroke: stroke
        });
        var vectorStyle = new ol.style.Style({
            fill: fill,
            stroke: stroke,
            image: circle
        });

        var tiledSource = new ol.source.VectorTile({
            format: new ol.format.TopoJSON({
                defaultProjection: 'EPSG:4326'
            }),
            projection: 'EPSG:3857',
            tileGrid: ol.tilegrid.createXYZ({maxZoom: 19}),
            url: 'http://{a-c}.tile.openstreetmap.us/vectiles-highroad/{z}/{x}/{y}.topojson'
        });

        var tiledVector = new ol.layer.VectorTile({
            source: tiledSource,
            style: vectorStyle
        });

        var mapLayer = new ol.layer.Tile({
            source: new ol.source.OSM()
        });
        mapLayer.setOpacity(0);

        // var mapLayer2 = new ol.layer.Tile({
        //     style: 'Road',
        //     source: new ol.source.MapQuest({ layer: 'osm' })
        // });
        // mapLayer2.setOpacity(.5);

      var format = new ol.format.TopoJSON();
      var tileGrid = ol.tilegrid.createXYZ({maxZoom: 19});
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
            style: function(feature) {
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











        var map = new ol.Map({
            target: 'map',
            // renderer: 'WebGL',
            layers: layers,
            view: new ol.View({
                //projection: 'EPSG:4326',
                //center: [4.8667, 50.4667],
                center: ol.proj.transform([4.8667, 50.4667], 'EPSG:4326', 'EPSG:3857'),
                zoom: 15
            })
        });

        map.on('pointermove', function (e) {
            vm.position = ol.proj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
            $scope.$apply();
            //   feature = null;
            //   var features = someLayer.getSource().getFeaturesAtCoordinate(evt.coordinate);
            //   if (features.length) {
            //     feature = features[0];
            //   }
        });


// ol.source.Vector.prototype.getFeatureInDistance =
//     function(coordinate, distance) {  
//     // Find the closet feature with in the given distance
//     // created from ol.source.Vector.prototype.getClosestFeatureToCoordinate
//     var x = coordinate[0];
//     var y = coordinate[1];
//     var closestFeature = null;
//     var previousCityBlockDistance = Infinity;
//     var extent = [x-distance, y-distance, x+distance, y+distance];
//     this.forEachFeatureInExtent(extent,function(feature) {
//         var geo = feature.getGeometry();
//         var coord = geo.getClosestPoint(coordinate);
//         var minCityBlockDistance = Math.abs(x - coord[0]) + Math.abs(y - coord[1]);
//         if (minCityBlockDistance <= distance && 
//             minCityBlockDistance < previousCityBlockDistance) {
//               previousCityBlockDistance = minCityBlockDistance;
//               closestFeature = feature;
//         }
//     });
//     return closestFeature;
// };

        map.on("click", function(e) {
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
        
        // var draw = new ol.interaction.Draw({
        //     type: 'Polygon',
        //     source: source,
        //     style: new ol.style.Style({
        //         image: new ol.style.RegularShape({
        //             // fill: new ol.style.Fill({color: 'red'}),
        //             stroke: new ol.style.Stroke({ color: 'black', width: 1 }),
        //             points: 4,
        //             radius: 30,
        //             radius2: 0,
        //             angle: 0
        //         }),
        //         stroke: new ol.style.Stroke({
        //             color: '#000',
        //             width: 1
        //         }),
        //         fill: new ol.style.Fill({ color: '#ffcc33' })
        //     })
        // });
        // map.addInteraction(draw);

        vm.map = map;










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

        var draw; // global so we can remove it later

        function addInteraction() {
            draw = new ol.interaction.Draw({
                type: vm.type,
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
                    }),
                })
            });
            map.addInteraction(draw);
        }

        vm.types = ["LineString", "Polygon"];
        vm.type = "LineString";

        vm.typeChanged = function (e) {
            map.removeInteraction(draw);
            addInteraction();
        };

        // addInteraction();
        
        var select = new ol.interaction.Select({
          layers: [layers[0]]
        });

        map.addInteraction(select);
    }
} ());