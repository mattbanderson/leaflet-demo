var map = L.map('map').setView([39.76, -84.18], 11);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

addGeoJsonToMap('data/metroparks.geo.json');

function addGeoJsonToMap(url) {
  $.get(url, function(data) {
    L.geoJson(data, {
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(
            '<h3>' + feature.properties.name + ' Metropark</h3>' +
            '<p>' + feature.properties.description + '</p>' +
            '<a href="' + 'http://metroparks.org/' + feature.properties.url + '" target="_blank">Learn More</a>'
          );
        }
      }
    }).addTo(map);
  });
}
