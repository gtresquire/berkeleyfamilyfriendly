// Example: Mara is a teacher with 2 children who works as a professor at the university
  let user = {
    name: "Mara",
    children: 2,
    email: "mara@university.edu",
    // picture: "", // can we store images on firebase?
    reviews: []
  };

  let reviews = {
    reviewer: "Mara", // name of user, string
	  location: ["Boscos", data], // name of place, string or tuple with lat and longittude?
	  rating: 3, // num between 1 and 5, integer
	  message: "It was fine." // the review of the location, string
  };

  let location = {
    hasBabyStation: false, // bool
	  hasParking: true, // bool
	  hasDriveThru: false, // bool?
	  rating: null, // number between 1 and 5? avg of review rattings?
	  business: "restaurant", // string
	  reviews: [], // array of review object
	  usersReviewed: 0 // number of the users who have reviewed this location
  }