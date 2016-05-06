// var 
//     featurePoint = new ol.Feature({
//         geometry: new ol.geom.Point([-11407000,2520000])
//         //geometry: new ol.geom.Point([-12590727, 2281352])
//     }),
//     featureLine = new ol.Feature({
//         geometry: new ol.geom.LineString([
//             [-11913296,3188998], [-11210043,1737457]
//         ])
//     }),
//     featurePoly = new ol.Feature({
//         geometry: new ol.geom.Polygon([
//             [
//                 [-12550727, 2281352],[-11168471, 3244427],
//                 [-10867077, 1986886],[-12550727, 2281352]
//             ]
//         ])
//     }),
//     sourceFeatures = new ol.source.Vector(),
//     layerFeatures = new ol.layer.Vector({
//         source: sourceFeatures
//     }),
//     sourceFeatures2 = new ol.source.Vector(),
//     layerFeatures2 = new ol.layer.Vector({
//         source: sourceFeatures2
//     });


// featurePoint.setId('pt');
// featurePoly.setId('poly');
// featureLine.setId('line');

// sourceFeatures2.addFeature(featurePoly);
// sourceFeatures.addFeatures([featureLine, featurePoint]);

// var map = new ol.Map({
//     target: document.getElementById('map'),
//     controls: [],
//     layers: [
//         new ol.layer.Tile({
//             source: new ol.source.OSM()
//         }),
//         layerFeatures, layerFeatures2
//     ],
//     view: new ol.View({
//         center : [-11407508,2520388],
//         zoom : 5
//     })
// });

// var hoverInteraction = new ol.interaction.Select({
//     condition: ol.events.condition.pointerMove,
//     layers: [layerFeatures, layerFeatures2]
// });
// map.addInteraction(hoverInteraction);

// var featureOverlay = new ol.FeatureOverlay({
//     map: map,
//     style: geometryStyle
// });

// hoverInteraction.on('select', function(evt){
//     if(evt.selected.length > 0){
//         console.info('selected: ' + evt.selected[0].getId());
        
//     }
// });
// map.on('pointermove', function(e) {
//     if (e.dragging) return;
       
//     var pixel = map.getEventPixel(e.originalEvent);
//     var hit = map.hasFeatureAtPixel(pixel);
    
//     map.getTarget().style.cursor = hit ? 'pointer' : '';

//     if(hit){
//         var pointer_coord = map.getEventCoordinate(e.originalEvent);
//         var closest = sourceFeatures.getClosestFeatureToCoordinate(pointer_coord);

//         if(closest){
//             var geometry = closest.getGeometry();
//             var closest_coord = geometry.getClosestPoint(pointer_coord);
            
//             var coefficient = compareCoordinates(pointer_coord, closest_coord);
//             console.info('closest: ' + closest.getId(), ' coeff: ' + coefficient);
            
//             if(between(coefficient, 0, 0.01)){
//                 featureOverlay.addFeature(closest);
                
//             } else {
//                 featureOverlay.removeFeature(closest);
//                 featureOverlay.getFeatures().clear();
//                 hoverInteraction.getFeatures().clear();
//             }
//         }
//     }
// });
// function compareCoordinates(coord1, coord2){
//     var
//         lon1 = Math.round(coord1[0]),
//         lon2 = Math.round(coord2[0]),
//         lat1 = Math.round(coord1[1]),
//         lat2 = Math.round(coord2[1]);

//     var
//         percent_lon = Math.abs(lon1 / lon2 - 1).toFixed(4),
//         percent_lat = Math.abs(lat1 / lat2 - 1).toFixed(4);
//         percent = (Number(percent_lon) + Number(percent_lat) / 2).toFixed(4);

//     return percent;
// }
// function between(number, min, max){
//     if(number >= min && number <= max) return true;
//     else return false;
// }
// function geometryStyle(feature){
//     var
//         style = [],
//         geometry_type = feature.getGeometry().getType(),
//         white = [255, 255, 255, 1],
//         blue = [0, 153, 255, 1],
//         width = 3;
        
//     style['LineString'] = [
//         new ol.style.Style({
//             stroke: new ol.style.Stroke({
//                 color: white, width: width + 2
//             })
//         }),
//         new ol.style.Style({
//             stroke: new ol.style.Stroke({
//                 color: blue, width: width
//             })
//         })
//     ],
//     style['Polygon'] = [
//         new ol.style.Style({
//             fill: new ol.style.Fill({ color: [255, 255, 255, 0.5] })
//         }),
//         new ol.style.Style({
//             stroke: new ol.style.Stroke({
//                 color: white, width: 3.5
//             })
//         }),
//         new ol.style.Style({
//             stroke: new ol.style.Stroke({
//                 color: blue, width: 2.5
//             })
//         })
//     ],
//     style['Point'] = [
//         new ol.style.Style({
//             image: new ol.style.Circle({
//                 radius: width * 2,
//                 fill: new ol.style.Fill({color: blue}),
//                 stroke: new ol.style.Stroke({
//                     color: white, width: width / 2
//                 })
//             })
//         })
//     ];
    
//     return style[geometry_type];
// }