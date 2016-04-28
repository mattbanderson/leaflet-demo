var map = L.map('map').setView([39.76, -84.18], 11);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var layers = L.control.layers().addTo(map);

addGeoJsonToMap('data/metroparks.geo.json', 'Metroparks', true);
addGeoJsonToMap('data/breweries.geo.json', 'Breweries', false);

function addGeoJsonToMap(url, layerName, showByDefault) {
  $.get(url, function(data) {
    var layer =
      L.geoJson(data, {
        onEachFeature: function (feature, layer) {
          if (feature.properties && feature.properties.name) {
            layer.bindPopup(
              '<h3>' + feature.properties.name + '</h3>' +
              '<p>' + feature.properties.description + '</p>' +
              '<a href="' + feature.properties.url + '" target="_blank">More details...</a>'
            );
          }
        }
      });
    if (showByDefault) {
      layer.addTo(map);
    }
    layers.addOverlay(layer, layerName);
  });
}
