// <script>  New GoogleApi for Gelocator below:
// runs during google maps api call back
function initMap() {

  // create a variable to store the position of our marker
  // let position;
  let locations;

  // grab the list of locations from firebase.
  database.ref("/location").once("value", function(snapshot) {
    locations = snapshot.val();

  }).then(() => {
    let map = createMap({lat: 37.8716, lng: -122.2727});
    let geocoder = new google.maps.Geocoder();

    for (i in locations) {
      geocodeAddress(geocoder, map, locations[i]);
    }
  }).catch(error => {
    console.log("an error occurred during initMap() call back");
    console.log(error);
  });
}

function createMap(centerPos) {

  let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: centerPos
  });

  return map;
}

function createMarker(pos, map, title) {
  let marker = new google.maps.Marker({
      position: pos,
      map: map,
      title: title
  });

  return marker;
}

function geocodeAddress(geocoder, resultsMap, location) {
  // geocode the address
  geocoder.geocode({'address': location.address}, (results, status) => {
    if (status === 'OK') {
      createMarker(results[0].geometry.location, resultsMap, location.name);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// Loop through the results array and place a marker for each
// set of coordinates.
window.eqfeed_callback = function (results) {
  for (var i = 0; i < results.features.length; i++) {
    var coords = results.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(coords[1], coords[0]);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
}

$("body").append('<script src="https://maps.googleapis.com/maps/api/js?key='+keys.GOOGLE_MAPS+'&callback=initMap">')
 