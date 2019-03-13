let username;
let location_name;
let address;
let city;
let state;
let zip;
let fullAddress;


let drivethru = false;
let parking = false;
let babyChanger = false;
let playArea = false;
let friendly = false;

let locType = "";

// funtion to send data to fier base from the user input form
function senddata() {
  username = document.getElementById("username").value;
  location_name = document.getElementById("locationName").value;
  address = document.getElementById("inputAddress").value;
  city = document.getElementById("inputCity").value;
  state = document.getElementById("state").value;
  zip = document.getElementById("inputZip").value;

  let count = 0;
  fullAddress = "";

  if(count < 1 && ! (address === "" || address == null) ) {
    fullAddress += address;
    count++;
  }
  else if ( ! (address === "" || address == null)) {
    fullAddress += ", " + address;
  }

  if(count < 1 && ! (city === "" || city == null) ) {
    fullAddress += city;
    count++;
  }
  else if ( ! (city === "" || city == null)) {
    fullAddress += ", " + city;
  }

  if(count < 1 && ! (state === "" || state == null) ) {
    fullAddress += state;
    count++;
  }
  else if ( ! (state === "" || state == null)) {
    fullAddress += ", " + state;
  }

  if(count < 1 && ! (zip === "" || zip == null) ) {
    fullAddress += zip;
    count++;
  }
  else if ( ! (zip === "" || zip == null)) {
    fullAddress += ", " + zip;
  }

  comment = document.getElementById("comment").value;

  drivethru = document.getElementById("checkbox1").checked;
  parking = document.getElementById("checkbox2").checked;
  babyChanger = document.getElementById("checkbox3").checked;
  playArea = document.getElementById("checkbox4").checked;
  friendly = document.getElementById("checkbox5").checked;

  let locTypeIn = document.getElementById("location-type").getElementsByTagName("input");

  let locationType = "";

  
  count = 0;
  for (i=0; i < locTypeIn.length; i++) {
    if (locTypeIn[i].checked) {
      if (count < 1) {
        locationType += locTypeIn[i].value;
        count++;
      }
      else {
        locationType += "/"+locTypeIn[i].value;
      }
    }
  }

  let user = {
    name: username,
    email: "",
    reviews: []
  };
  
  let review = {
    reviewer: username, // name of user, string
    location: location_name, // name of place, string or tuple with lat and longittude?
    rating: -1, // num between 1 and 5, integer // default value set to -1 because it was not given a rating
    message: comment // the review of the location, string
  };
  
  let place = {
    name: location_name,
    address: fullAddress,
    type: locationType,
    reviews: [], // array of review object
    category: {
      driveThru: drivethru,
      parking: parking,
      familyFriendly: friendly,
      babyChange: babyChanger,
      playground: playArea
    }
  };

  user.reviews.push(review);
  place.reviews.push(review);

  writeLocationData(place);
  writeUserData(user);
  writeReviewData(review);

}  // end send data function

// appends to the row containing the location information and review
database.ref("location").on("child_added", data => {
    let reviewer = data.val().reviews[0].reviewer;
    let locName = data.val().name;
    let type = data.val().type;
    let address = data.val().address;
    let comment = data.val().reviews[0].message;

    let tableBody = document.getElementById("location-info");
    let row = document.createElement("tr");

    let revCol = document.createElement("td");
    let locCol = document.createElement("td");
    let typCol = document.createElement("td");
    let addCol = document.createElement("td");
    let msgCol = document.createElement("td");

    revCol.textContent = reviewer;
    locCol.textContent = locName;
    typCol.textContent = type;
    addCol.textContent = address;
    msgCol.textContent = comment;

    row.append(revCol, locCol, typCol, addCol, msgCol);
    tableBody.append(row);
});

// function sortmap (){
//     console.log("sort the map");
//     // logic goes here for what to show and hide
// }

// // When submit button is clicked we will fire the funtion that sends the data to firebase
$("#submit").on("click", function(){
  senddata();
  initMap();
});


//Parking is checked on the user input form 
$(document).ready(function(){
    $("#checkbox1").click(function(){
        if($(this).prop("checked") == true){
            parking = true;
        }
        else if($(this).prop("checked") == false){
            parking = false;
        }
    });
});

//  Baby Changer is checked on the user input form
$(document).ready(function(){
    $("#checkbox2").click(function(){
        if($(this).prop("checked") == true){
            babyChanger = true;
        }
        else if($(this).prop("checked") == false){
            babyChanger = false;
        }
    });
});

// Drive Thru is checked on the user input form
$(document).ready(function(){
    $("#checkbox3").click(function(){
        if($(this).prop("checked") == true){
            drivethru = true;
        }
        else if($(this).prop("checked") == false){
            drivethru = false;
        }
    });
});

// Pay Area is checked on the user input form
$(document).ready(function () {
  $("#checkbox4").click(function () {
    if ($(this).prop("checked") == true) {
      playArea = true;
    }
    else if ($(this).prop("checked") == false) {
      playArea = false;
    }
  });
});

// Family Friendly is checked on user input form
$(document).ready(function () {
  $("#checkbox5").click(function () {
    if ($(this).prop("checked") == true) {
      friendly = true;
    }
    else if ($(this).prop("checked") == false) {
      friendly = false;
    }
  });
});


// Parking is checked on the map sort feature
$(document).ready(function () {
  $("#inlincheckbox1").click(function () {
    if ($(this).prop("checked") == true) {
      parking = true;
    }
    else if ($(this).prop("checked") == false) {
      parking = false;
    }
  });
});

//  Baby Changer is checked on the map sort feature
$("#inlincheckbox2").click(function () {
  if ($(this).prop("checked") == true) {
    babyChanger = true;
  }
  else if ($(this).prop("checked") == false) {
    babyChanger = false;
  }
});

// Drive Thru is checked on the map sort feature
$(document).ready(function () {
  $("#inlincheckbox3").click(function () {
    if ($(this).prop("checked") == true) {
      drivethru = true;
    }
    else if ($(this).prop("checked") == false) {
      drivethru = false;
    }
  });
});

// Play Area is checked on the map sort feature
$(document).ready(function () {
  $("#inlincheckbox4").click(function () {
    if ($(this).prop("checked") == true) {
      playArea = true;
    }
    else if ($(this).prop("checked") == false) {
      playArea = false;
    }
  });
});

// Family Friendly is checked on the map sort feature
$(document).ready(function () {
  $("#inlinecheckbox5").click(function () {
    if ($(this).prop("checked") == true) {
      friendly = true;
    }
    else if ($(this).prop("checked") == false) {
      friendly = false;
    }
  });
});