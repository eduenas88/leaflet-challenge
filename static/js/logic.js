// Load in geojson data
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
var geojson;

// Grab data with d3
  d3.json(geoData, function(data) {
    console.log(data); 
    createFeatures(data.features);  
  }); 

var legend = L.control({ position: "bottomright" });
  // Set up the legend
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    grades = [1, 2, 3, 4, 5],
    labels = [];
  
    // Add min & max
  for (var i=0; i < grades.length; i++){
    div.innerHTML += 
        '<i style="background:' + color(grades[i] + '"></i> ' +
        grades[i] + (grades[i +1] ? '&ndash;' + grades[i + 1] + '<br>' : '+')
        )}
  
    return div;
  }; 


  function color(c)
  {
  x = Math.ceil(c); 
  switch (Math.ceil(x)){
    case 1: 
      return "#66FF33"; 
    case 2: 
      return "#F3FF33"; 
    case 3: 
      return "#FFD033"; 
    case 4: 
      return "#FFB833"; 
    case 5: 
      return "#FF8033"; 
    default: 
      return "#FF3333"; 
  }
  }; 
    
// Binding a pop-up to each layer
function createFeatures(earthQuake) {
  var earthQuakes = L.geoJSON(earthQuake, {
    pointToLayer: function(feature,latlng){
      return L.circleMarker(latlng, {
        radius: feature.properties.mag*5,
        fillColor: color(feature.properties.mag),
        color: "#000", 
        weight: 1, 
        opacity: 1, 
        fillOpacity: .5})
        .bindPopup("<h3>" + "Location: " + feature.properties.place +
        "</h3><hr><p>" + "Date/Time: " + new Date (feature.properties.time) + "<br>" +
        "Magnitude: " + feature.properties.mag + "</p>"); 
      } 
    }); 
    createMap(earthQuakes); 
  
};   
  ;   

function createMap(earthQuakes) {
  
  // Define streetmap and darkmap layers
  var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  
  });
  var baseMaps = {
    "Street Map": lightmap ,
    "Dark Map": darkmap
  }

  var overlayMaps ={
    earthQuake: earthQuakes
}; 
  
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
  }) 

// Creating map object
var myMap = L.map("map", {
  center: [34.0522, -118.2437],
  zoom: 8,
  layers: [lightmap, earthQuakes]
}); 

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

// Adding legend to the map
legend.addTo(myMap); 

};

  
  ; 