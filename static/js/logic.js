var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
});

var map = L.map("map", {
    center: [36.778259, -119.417931],
    zoom: 4,
    layers: [lightmap]
  });

  lightmap.addTo(map);

var quake = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// console.log(quake)

function markerSize(mag) {
    return mag * 4;
};


var earthquakes = new L.LayerGroup();

d3.json(quake).then(function(geoJson) {
    console.log(geoJson)
    L.geoJSON(geoJson.features, {
        pointToLayer: function (geoJsonPoint, latlng) {
            return L.circleMarker(latlng, { radius: markerSize(geoJsonPoint.properties.mag) });
        },

        style: function (geoJsonFeature) {
            return {
                fillColor: Color(geoJsonFeature.properties.mag),
                fillOpacity: 1,
                weight: 0.2,
                color: 'black'

            }
        },

        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "<h4 style='text-align:center;'>" + new Date(feature.properties.time) +
                "</h4> <hr> <h5 style='text-align:center;'>" + feature.properties.title + "</h5>" + "magnitude=" +feature.properties.mag);
        }
    }).addTo(map);

});

function Color(mag) {
    if (mag > 5) {
        return 'red'
    } else if (mag > 4) {
        return 'orange'
    } else if (mag > 3) {
        return 'yellow'
    } else if (mag > 2) {
        return 'green'
    } else if (mag > 1) {
        return 'blue'
    } else {
        return 'chartreuse'
    }
};





