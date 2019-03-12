// Call the script firebase-connect.js before attempting to call this script.
// The firebase variable comes from the firebase-connect.js script
let database = firebase.database();

console.log(database);

// Setting up mock data
// let position = {
//     lat: 37.7749,
//     lng: -122.4194 
// }

// console.log(position);

let sf = {
    name: "san francisco",
    position: {lat: 37.7749, lng: -122.4194},
    address: "san francisco, california",
    type: "city",
    reviews: []
}

let berk = {
    name: "berkeley",
    position: {lat: 37.8716, lng: -122.2727},
    address: "berkeley, california",
    type: "city",
    reviews: []
}

let user = {
    name: "mara",
    children: 2,
    email: "mara@university.edu",
    // picture: "", // can we store images on firebase?
    reviews: []
};

let reviewSF = {
    reviewer: "mara", // name of user, string
    location: "san francisco", // name of location
    rating: 5, // num between 1 and 5, integer
    message: "I love San Francisco!" // the review of the sf, string
};

let reviewB = {
    reviewer: "mara", // name of user, string
    location: "berkeley", // name of location
    rating: 5, // num between 1 and 5, integer
    message: "Berkeley is awesome!" // the review of the sf, string
};

// user.reviews.push(reviewSF);
// sf.reviews.push(reviewSF);

// user.reviews.push(reviewB);
// berk.reviews.push(reviewB);

// console.log(user);
// console.log(sf);
// console.log(review);

// Enter mock data into firebase

// establish a connection 
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

// writeUserData(user);
// writeLocationData(berk);
// writeReviewData(reviewB);

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
    }).catch((error) => {
      console.log("an error occurred during initMap() call back");
      console.log(error);
    });
  }