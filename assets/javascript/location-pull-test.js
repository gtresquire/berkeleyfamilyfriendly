// Call the script firebase-connect.js before attempting to call this script.
// The firebase variable comes from the firebase-connect.js script
let database = firebase.database();

console.log(database);

// Setting up mock data
let position = {
    lat: 37.7749,
    lng: -122.4194 
}

// console.log(position);

let place = {
    name: "san francisco",
    position: position,
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

let review = {
    reviewer: "mara", // name of user, string
    location: "san francisco", // name of place
    rating: 5, // num between 1 and 5, integer
    message: "I love San Francisco!" // the review of the place, string
};

user.reviews.push(review);
place.reviews.push(review);

// console.log(user);
// console.log(place);
// console.log(review);

// Enter mock data into firebase

// establish a connection 
// location (or place) gets pushed to firebase
function writeLocationData(place) {
    database.ref("/location/"+place.name).set({
        name: place.name,
        position: place.position,
        type: place.type,
        reviews: place.reviews
    }, function(error) {
        if(error) {
            console.log("failed to write " + place.name + " to firebase backend");
        } else {
            console.log("successfully wrote " + place.name + " to firebase backend");
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
    }, function(error) {
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
        location: review.location, // name of place
        rating: review.rating, // num between 1 and 5, integer
        message: review.message // the review of the place, string
    }, function(error) {
        if(error) {
            console.log("failed to write review to firebase backend");
        } else {
            console.log("successfully wrote review to firebase backend");
        }
    });
}


// gets the position stored in firebase that is at the specified "place"
// place must be a string
function getPosition(place) {
    let position;
    // now we retrieve the lat and long of SF from firebase
    database.ref("/location/"+place).on("value", function(snapshot) {
        // console.log(snapshot.val());
        position = snapshot.val().position;
        console.log(position);
    });

    console.log("returning position");
    return position;
}
