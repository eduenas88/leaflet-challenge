// Creating map object
var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 8
  });
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Load in geojson data
  var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  var geojson;
  
  // Grab data with d3
  d3.json(geoData, function(data) {
    console.log(data); 
    // Create a new choropleth layer
    geojson = L.circleMarker(data, {
  
      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        console.log(feature.coordinates); 
        layer.bindPopup("Plate name: " + feature.properties.PlateName);
      }
    }).addTo(myMap);
  
    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var mag = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
      var colors = ["#66FF33", "#F3FF33", "#FFD033", "#FFB833", "#FF8033", "#FF3333"];
      var labels = [];
  
      // Add min & max
      var legendInfo = "<h1>Magnitude</h1>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">" + mag[0] + "</div>" +
          "<div class=\"max\">" + mag[mag.length - 1] + "</div>" +
        "</div>";
  
      div.innerHTML = legendInfo;
  
      limit.forEach(function() {
        labels.push("<li style=\"background-color: " + legendInfo[i].colors + "\">" + legendInfo[i].limit+"</li>");
      });
  
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };
  
    // Adding legend to the map
    legend.addTo(myMap);
  
  });
  