// location (or sf) gets pushed to firebase
function writeLocationData(location) {
  database.ref("/location/"+location.name).set({
      name: location.name,
      // position: location.position,
      address: location.address,
      type: location.type,
      reviews: location.reviews,
      category: {
        driveThru: location.category.driveThru,
        parking: location.category.parking,
        familyFriendly: location.category.familyFriendly,
        babyChange: location.category.babyChange,
        playground: location.category.playground
      }
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
      // children: user.children,
      email: user.email,
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
      location: review.location, // name of place, string
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


/*
Drew // user.name
A Nice Park // place.name
Park // type ?
123 University Ave, Berkeley, CA // park
This is a very clean and safe park with ample parking! // review
*/

// Example: Mara is a teacher with 2 children who works as a professor at the university
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

drew.reviews.push(review);
place.reviews.push(review);

writeLocationData(place);
writeUserData(drew);
writeReviewData(review);