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
    L.geojson(data,
      pointToLayer, function (feature, latlng) {
      return L.circleMarker( latlng,{
          radius: feature.properties.mag*4, 
          color: "black", 
          weight: 1, 
          opacity: 1, 
          fillOpacity: 0.5
      }       
          )}
    ); 
      // Binding a pop-up to each layer
    var earthQuake = L.geojson(data, {
      onEachFeature: function(feature, layer) {
        console.log(feature.coordinates); 
        layer.bindPopup("Plate name: " + feature.properties.PlateName);
      }
    }).addTo(myMap)
    
  });   
     
  
    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      grades = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"],
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
  
    // Adding legend to the map
    legend.addTo(myMap);


  