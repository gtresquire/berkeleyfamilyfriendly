// write a location object to firebase database
function writeLocationData(location) {
    if ( ! (location.name === "" || location.name == null)
    && ( ! (location.address === "" || location.address == null))) {
        database.ref("/location/"+location.name).set({
            name: location.name,
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
}

// write a user object to firebase database
function writeUserData(user) {
    if ( ! (user.name === "" || user.name == null)) {
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
}


// write a review object to firebase database
function writeReviewData(review) {
    if ( ! (review.reviewer === "" || review.reviewer == null)
    && ! (review.location === "" || review.location == null)) {
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
}


