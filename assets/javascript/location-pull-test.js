// Call the script firebase-connect.js before attempting to call this script.
// The firebase variable comes from the firebase-connect.js script
// The database variable also comes from the firebase-connect.js script
// write functions come from the file firebase-write-data.js script

// Setting up mock data
let position = {
    lat: 37.7749,
    lng: -122.4194 
}

console.log(position);

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

let drew = {
  name: "Drew",
  // children: 2,
  email: "codingcorgis@university.edu",
  // picture: "", // can we store images on firebase?
  reviews: []
};

let review = {
  reviewer: "Drew", // name of user, string
  location: "Live Oak Park", // name of place, string or tuple with lat and longittude?
  rating: 5, // num between 1 and 5, integer
  message: "This is a very clean and safe park with ample parking!" // the review of the location, string
};

let place = {
  name: "Live Oak Park",
  address: "1301 Shattuck Ave, Berkeley, CA 94709",
  type: "park",
  reviews: [], // array of review object
  category: {
    driveThru: false,
    parking: true,
    familyFriendly: true,
    babyChange: false,
    playground: true
  }
};

user.reviews.push(reviewSF);
sf.reviews.push(reviewSF);

user.reviews.push(reviewB);
berk.reviews.push(reviewB);

drew.reviews.push(review);
place.reviews.push(review);

writeUserData(user);
writeLocationData(berk);
writeReviewData(reviewB);

writeLocationData(place);
writeUserData(drew);
writeReviewData(review);