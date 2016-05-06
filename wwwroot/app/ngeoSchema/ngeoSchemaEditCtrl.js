
// (function () {
//     "use strict";

//     angular
//         .module("ngeoSchemaModule")
//         .controller("ngeoSchemaEditCtrl", [ "$scope", "ngeoDecorateInteraction", "ngeoFeatureOverlayMgr", ngeoSchemaEditCtrl]);
        
//     /**
//     * @param {ngeo.DecorateInteraction} ngeoDecorateInteraction Decorate
//     *     interaction service.
//     * @param {ngeo.FeatureOverlayMgr} ngeoFeatureOverlayMgr Feature overlay
//     *     manager.
//     * @constructor
//     * @ngInject
//     */        
//     function ngeoSchemaEditCtrl($scope, ngeoDecorateInteraction, ngeoFeatureOverlayMgr) {
//         var vm = this;
//         /**
//         * Collection shared between the drawing interactions and the feature
//         * overlay used to render the drawn features.
//         * @type {ol.Collection.<ol.Feature>}
//         */
//         var features = new ol.Collection();
      
//         var overlay = ngeoFeatureOverlayMgr.getFeatureOverlay();
//         overlay.setFeatures(features);
//         overlay.setStyle(new ol.style.Style({
//           fill: new ol.style.Fill({
//             color: 'rgba(255, 255, 255, 0.2)'
//           }),
//           stroke: new ol.style.Stroke({
//             color: '#ffcc33',
//             width: 2
//           }),
//           image: new ol.style.Circle({
//             radius: 7,
//             fill: new ol.style.Fill({
//               color: '#ffcc33'
//             })
//           })
//         }));
      
//         /**
//         * @type {ol.Map}
//         * @export
//         */
//         vm.map = new ol.Map({
//           layers: [
//             // new ol.layer.Tile({
//             //   source: new ol.source.MapQuest({layer: 'sat'})
//             // })
//           ],
//           view: new ol.View({
//             center: [-10997148, 4569099],
//             zoom: 4
//           })
//         });
      
//         var map = vm.map;
      
//         // initialize the feature overlay manager with the map
//         ngeoFeatureOverlayMgr.init(map);
      
//         /**
//         * @type {ol.interaction.Draw}
//         * @export
//         */
//         vm.drawPolygon = new ol.interaction.Draw(
//             /** @type {olx.interaction.DrawOptions} */ ({
//               type: 'Polygon',
//               features: features
//             }));
      
//         var drawPolygon = vm.drawPolygon;
      
//         drawPolygon.setActive(false);
//         ngeoDecorateInteraction(drawPolygon);
//         map.addInteraction(drawPolygon);
      
//         /**
//         * @type {ol.interaction.Draw}
//         * @export
//         */
//         vm.drawPoint = new ol.interaction.Draw(
//             /** @type {olx.interaction.DrawOptions} */ ({
//               type: 'Point',
//               features: features
//             }));
      
//         var drawPoint = vm.drawPoint;
//         drawPoint.setActive(false);
//         ngeoDecorateInteraction(drawPoint);
//         map.addInteraction(drawPoint);
      
//         /**
//         * @type {ol.interaction.Draw}
//         * @export
//         */
//         vm.drawLine = new ol.interaction.Draw(
//             /** @type {olx.interaction.DrawOptions} */ ({
//               type: 'LineString',
//               features: features
//             }));
      
//         var drawLine = vm.drawLine;
//         drawLine.setActive(false);
//         ngeoDecorateInteraction(drawLine);
//         map.addInteraction(drawLine);      
//     }
// }());

(function () {
  "use strict";

  angular
    .module("ngeoSchemaModule")
    .controller("ngeoSchemaEditCtrl", ["$scope", "ngeoDecorateInteraction", "ngeoFeatureOverlayMgr", ngeoSchemaEditCtrl]);

  function ngeoSchemaEditCtrl($scope, ngeoDecorateInteraction, ngeoFeatureOverlayMgr) {
    var vm = this;

    // var raster = new ol.layer.Tile({
    //   source: new ol.source.MapQuest({ layer: 'sat' })
    // });

    // vm.map = new ol.Map({
    //   layers: [raster],
    //   target: 'map',
    //   view: new ol.View({
    //     center: [-11000000, 4600000],
    //     zoom: 4
    //   })
    // });

    // var map = vm.map;

    // var features = new ol.Collection();
    // var featureOverlay = new ol.layer.Vector({
    //   source: new ol.source.Vector({ features: features }),
    //   style: new ol.style.Style({
    //     fill: new ol.style.Fill({
    //       color: 'rgba(255, 255, 255, 0.2)'
    //     }),
    //     stroke: new ol.style.Stroke({
    //       color: '#ffcc33',
    //       width: 2
    //     }),
    //     image: new ol.style.Circle({
    //       radius: 7,
    //       fill: new ol.style.Fill({
    //         color: '#ffcc33'
    //       })
    //     })
    //   })
    // });
    // featureOverlay.setMap(map);

    // var modify = new ol.interaction.Modify({
    //   features: features,
    //   // the SHIFT key must be pressed to delete vertices, so
    //   // that new vertices can be drawn at the same position
    //   // of existing vertices
    //   deleteCondition: function (event) {
    //     return ol.events.condition.shiftKeyOnly(event) &&
    //       ol.events.condition.singleClick(event);
    //   }
    // });
    // map.addInteraction(modify);

    // var draw; // global so we can remove it later
    // function addInteraction() {
    //   draw = new ol.interaction.Draw({
    //     features: features,
    //     type: "LineString"
    //   });
    //   map.addInteraction(draw);
    // }

    // addInteraction();

    var layer = new ol.layer.Tile({
      source: new ol.source.OSM(),
      opacity: 0.8,
      brightness: 1
    });

    var interaction = new ol.interaction.DragRotateAndZoom();
    var control = new ol.control.FullScreen();
    var center = ol.proj.transform([-1.812, 52.443], 'EPSG:4326', 'EPSG:3857');

    var overlay = new ol.Overlay({
      element: document.getElementById('overlay'),
      positioning: 'bottom-center'
    });

    var view = new ol.View({
      center: center,
      zoom: 2
    });

    vm.map = new ol.Map({
      target: 'map',
      layers: [layer],
      interactions: [interaction],
      controls: [control],
      overlays: [overlay],
      view: view,
      renderer: 'dom'
    });

    // var map = new ol.Map();
    // map.addInteraction(interaction);
    // map.addControl(control);

    vm.mapClick = function (event) {
      var coord = event.coordinate;
      var degrees = ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326')
      var hdms = ol.coordinate.toStringHDMS(degrees);
      var element = overlay.getElement();
      element.innerHTML = hdms;
      overlay.setPosition(coord);
      vm.map.addOverlay(overlay);
    };

    vm.map.on("click", vm.mapClick);

    // var visible = new ol.dom.Input(document.getElementById('visible'));
    // visible.bindTo('checked', layer, 'visible');

    // var checkbox = document.getElementById('visible');
    // checkbox.addEventListener('change', function () {
    //   var checked = this.checked;
    //   if (checked !== layer.getVisible()) {
    //     layer.setVisible(checked);
    //   }
    // });

    // vm.visibleChecked = true;

    vm.toggleSync = function (item) {
      layer.setVisible(item);
    }
    
    // layer.on('change:visible', function() {
    //   var visible = this.getVisible();
    //   if (visible !== checkbox.checked) {
    //     checkbox.checked = visible;
    //   }
    // });
    
    vm.rome = ol.proj.transform([12.5, 41.9], 'EPSG:4326', 'EPSG:3857');

    vm.doBounce = function (location) {
      var bounce = ol.animation.bounce({
        resolution: vm.map.getView().getResolution() * 2
      });
      var pan = ol.animation.pan({
        source: vm.map.getView().getCenter()
      });
      vm.map.beforeRender(bounce);
      vm.map.beforeRender(pan);
      vm.map.getView().setCenter(location);
    }
  }
} ());


