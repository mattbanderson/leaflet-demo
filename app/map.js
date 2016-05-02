var map = L.map('map').setView([39.76, -84.18], 11);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var layersCtrl = L.control.layers().addTo(map);

addGeoJsonToMap('data/metroparks.geo.json', 'Metroparks', true);

function addGeoJsonToMap(url, layerName, showByDefault, customIcon) {
  $.get(url, function(data) {
    var layer =
      L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, customIcon ? {icon: customIcon} : {});
        },
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
    layersCtrl.addOverlay(layer, layerName);
  });
}

var beerIcon = L.icon({
    iconUrl: 'img/beer.png',
    iconSize: [53, 75]
});
addGeoJsonToMap('data/breweries.geo.json', 'Breweries', false, beerIcon);
