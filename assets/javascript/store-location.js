// <script>  New GoogleApi for Gelocator below:
// runs during google maps api call back
function initMap() {

  // create a variable to store the position of our marker
  // let position;
  let locations;

  // grab the list of locations from firebase.
  database.ref("/location").once("value", function(snapshot) {
    locations = snapshot.val();
    console.log(locations);
  }).then(() => {
    let map = createMap(locations["berkeley"].position);
    console.log(locations["berkeley"]);

    let geocoder = new google.maps.Geocoder();

    for (i in locations) {
      // console.log(locations[i]);

      geocodeAddress(geocoder, map, locations[i]);
    }
  }).catch(error => {
    console.log("an error occurred during initMap() call back");
    console.log(error);
  });
}

function createMap(centerPos) {
  console.log(centerPos);

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
      let marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
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

// location (or sf) gets pushed to firebase
function writeLocationData(location) {
  database.ref("/location/"+location.name).set({
      name: location.name,
      position: location.position,
      address: location.address,
      type: location.type,
      reviews: location.reviews
  }, error => {
      if(error) {
          console.log("failed to write " + location.name + " to firebase backend");
      } else {
          console.log("successfully wrote " + location.name + " to firebase backend");
      }
  });
}

// ref("/user")
// user gets pushed to firebase
function writeUserData(user) {
  database.ref("/user/"+user.name).set({
      name: user.name,
      children: user.children,
      email: user.email,
      // picture: "", // can we store images on firebase?
      reviews: user.reviews
  }, error => {
      if(error) {
          console.log("failed to write " + user.name + " to firebase backend");
      } else {
          console.log("successfully wrote " + user.name + " to firebase backend");
      }
  });
}

// ref("/review")
// review gets pushed to firebase
function writeReviewData(review) {
  database.ref("/review/"+review.location+"/"+review.reviewer).set({
      reviewer: review.reviewer, // name of user, string
      location: review.location, // name of sf
      rating: review.rating, // num between 1 and 5, integer
      message: review.message // the review of the sf, string
  }, error => {
      if(error) {
          console.log("failed to write review to firebase backend");
      } else {
          console.log("successfully wrote review to firebase backend");
      }
  });
}

{/* <td>Drew</td>
<td>A Nice Park</td>
<td>Park</td>
<td>123 University Ave, Berkeley, CA</td>
<td>This is a very clean and safe park with ample parking!</td> */}

// Initialize Firebase
let config = {
  apiKey: keys.FIREBASE,
  authDomain: "cool-kids-81481.firebaseapp.com",
  databaseURL: "https://cool-kids-81481.firebaseio.com",
  projectId: "cool-kids-81481",
  storageBucket: "cool-kids-81481.appspot.com",
  messagingSenderId: "905740305108"
};

console.log(config)
firebase.initializeApp(config);

console.log(firebase);

let database = firebase.database();
console.log(database);


$("body").append('<script src="https://maps.googleapis.com/maps/api/js?key='+keys.GOOGLE_MAPS+'&callback=initMap">')
 