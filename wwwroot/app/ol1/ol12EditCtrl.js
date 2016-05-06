(function () {
  "use strict";

  angular
    .module("ngeoSchemaModule")
    .controller("ol12EditCtrl", ["$scope", "ngeoDecorateInteraction", "ngeoFeatureOverlayMgr", ol12EditCtrl]);

  function ol12EditCtrl($scope, ngeoDecorateInteraction, ngeoFeatureOverlayMgr) {
    var vm = this;



    var tiledRaster = new ol.layer.Tile({
      source: new ol.source.OSM()
    });

    var center = ol.proj.transform([-72.6, 41.7], 'EPSG:4326', 'EPSG:3857');

    var view = new ol.View({
      center: center,
      zoom: 12,
    });

    var map = new ol.Map({
      target: 'map',
      layers: [tiledRaster],
      view: view
    });

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

    var vectorLoader = function (extent, resolution, projection) {
      var url = 'http://demo.boundlessgeo.com/geoserver/wfs?service=WFS&' +
        'version=1.1.0&request=GetFeature&typename=osm:builtup_area&' +
        'outputFormat=text/javascript&format_options=callback:loadFeatures' +
        '&srsname=EPSG:3857&bbox=' + extent.join(',') + ',EPSG:3857';
      $.ajax({
        url: url,
        dataType: 'jsonp'
      });
    };

    var loadFeatures = function (response) {
      var features = vectorSource.readFeatures(response);
      vectorSource.addFeatures(features);
    };

    var vectorSource = new ol.source.ServerVector({
      format: new ol.format.GeoJSON(),
      loader: vectorLoader,
      strategy: ol.loadingstrategy.createTile(new ol.tilegrid.XYZ({
        maxZoom: 19
      })),
      projection: 'EPSG:3857',
    });

    var serverVector = new ol.layer.vector({
      source: vectorSource,
      style: vectorStyle
    });

    vm.map = new ol.Map({
      renderer: 'canvas',
      target: 'map',
      layers: [tiledRaster, serverVector],
      view: view
    });

  }
} ());


