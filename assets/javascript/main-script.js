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
  // console.log("send data to firebase");
  username = document.getElementById("username").value;
  location_name = document.getElementById("locationName").value;
  address = document.getElementById("inputAddress").value;
  city = document.getElementById("inputCity").value;
  state = document.getElementById("state").value;
  zip = document.getElementById("inputZip").value;
  fullAddress = address + ", " + city + ", " + state + ", " + zip;
  // console.log(fullAddress);
  comment = document.getElementById("comment");

  drivethru = document.getElementById("checkbox1").checked;
  parking = document.getElementById("checkbox2").checked;
  babyChanger = document.getElementById("checkbox3").checked;
  playArea = document.getElementById("checkbox4").checked;
  friendly = document.getElementById("checkbox5").checked;
  // console.log(friendly);

  let locTypeIn = document.getElementById("location-type").getElementsByTagName("input");
  console.log(locTypeIn);

  let locationType = "";

  let count = 0;
  for (i in locTypeIn) {
    // console.log(locTypeIn[i].checked);
    if (locTypeIn[i].checked) {
      if (count < 1) {
        // console.log(locTypeIn[i].value);
        locationType += locTypeIn[i].value;

        count++;
      }
      else {
        // console.log("/"+locTypeIn[i].value);
        locationType += "/"+locTypeIn[i].value;
      }
    }
  }
  // console.log(locationType);

  // let parentplace = {
  //   username: username,
  //   title: location_name,
  //   address: fullAddress,
  //   comment: comment,
  //   drivethru: drivethru,
  //   parking: parking,
  //   changer: babyChanger,
  //   play: playArea,
  //   friendly: friendly
  // }

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

  // database.ref("/location/" + parentplace.title).set(parentplace);

  // console.log(place);
  // console.log(user);
  // console.log(review);

  writeLocationData(place);
  writeUserData(user);
  writeReviewData(review);

}  // end send data function

function appendTable(){
// grab data from firebase and store as

username = document.getElementById("username").value;
location_name = document.getElementById("locationName").value;
address = document.getElementById("inputAddress").value;
city = document.getElementById("inputCity").value;
state = document.getElementById("state").value;
zip = document.getElementById("inputZip").value;
fullAddress = address + ", " + city + ", " + state + ", " + zip;
console.log(fullAddress);
comment = document.getElementById("comment");

drivethru = document.getElementById("checkbox1").checked;
parking = document.getElementById("checkbox2").checked;
babyChanger = document.getElementById("checkbox3").checked;
playArea = document.getElementById("checkbox4").checked;
friendly = document.getElementById("checkbox5").checked;
console.log(friendly);

//  console.log(database);
//  database.ref().once('value').then(function(snapshot){
//   let currentdata = snapshot.val();
//   console.log(currentdata);
//   console.log(currentdata.location.address);
//   console.log(currentdata.location.username);
//   console.log(currentdata.location.comment);

  let tableRef = document.getElementById('tableData');
  console.log(tableRef);
  // Insert a row in the table at row index 0
  let newRow   = tableRef.insertRow(tableRef.rows.length);

  // Insert a cell in the row at index 0-5
  let data1  = newRow.insertCell(0);
  let data2  = newRow.insertCell(1);
  let data3  = newRow.insertCell(2);
  let data4  = newRow.insertCell(3);
  let data5  = newRow.insertCell(4);
  let data6  = newRow.insertCell(5);

  // Append a text node to the cell
 // let newText  = document.createTextNode('test node');

  data1.innerHTML = 4;
  data2.innerHTML = username;
  data3.innerHTML = location_name;
  data4.innerHTML = "Park Dummy";
  data5.innerHTML = address;
  data6.innerHTML = comment;
}

// function sortmap (){
//     console.log("sort the map");
//     // logic goes here for what to show and hide
// }

// // When submit button is clicked we will fire the funtion that sends the data to firebase
$("#submit").on("click", function(){
  senddata();
  // appendTable();
});


//Parking is checked on the user input form 
$(document).ready(function(){
    $("#checkbox1").click(function(){
        if($(this).prop("checked") == true){
            // console.log("we got parking");
            parking = true;
        }
        else if($(this).prop("checked") == false){
            // console.log("no parking");
            parking = false;
        }
    });
});

//  Baby Changer is checked on the user input form
$(document).ready(function(){
    $("#checkbox2").click(function(){
        if($(this).prop("checked") == true){
            // console.log("we got diapers")
            babyChanger = true;
        }
        else if($(this).prop("checked") == false){
            // console.log("no diapers here")
            babyChanger = false;
        }
    });
});

// Drive Thru is checked on the user input form
$(document).ready(function(){
    $("#checkbox3").click(function(){
        if($(this).prop("checked") == true){
            // console.log("stay in the car!!")
            drivethru = true;
        }
        else if($(this).prop("checked") == false){
            // console.log("you'll have to get out.")
            drivethru = false;
        }
    });
});

// Pay Area is checked on the user input form
$(document).ready(function () {
  $("#checkbox4").click(function () {
    if ($(this).prop("checked") == true) {
    //   console.log("the kids can play here")
      playArea = true;
    }
    else if ($(this).prop("checked") == false) {
    //   console.log("bring a toy.")
      playArea = false;
    }
  });
});

// Family Friendly is checked on user input form
$(document).ready(function () {
  $("#checkbox5").click(function () {
    if ($(this).prop("checked") == true) {
    //   console.log("they like kids here");
      friendly = true;
    }
    else if ($(this).prop("checked") == false) {
    //   console.log("they were rude to kids here.");
      friendly = false;
    }
  });
});


// Parking is checked on the map sort feature
$(document).ready(function () {
  $("#inlincheckbox1").click(function () {
    if ($(this).prop("checked") == true) {
    //   console.log("we got parking");
      parking = true;
    }
    else if ($(this).prop("checked") == false) {
    //   console.log("no parking");
      parking = false;
    }
  });
});

//  Baby Changer is checked on the map sort feature
$("#inlincheckbox2").click(function () {
  if ($(this).prop("checked") == true) {
    // console.log("we got diapers")
    babyChanger = true;
  }
  else if ($(this).prop("checked") == false) {
    // console.log("no diapers here")
    babyChanger = false;
  }
});

// Drive Thru is checked on the map sort feature
$(document).ready(function () {
  $("#inlincheckbox3").click(function () {
    if ($(this).prop("checked") == true) {
    //   console.log("stay in the car!!")
      drivethru = true;
    }
    else if ($(this).prop("checked") == false) {
    //   console.log("you'll have to get out.")
      drivethru = false;
    }
  });
});

// Play Area is checked on the map sort feature
$(document).ready(function () {
  $("#inlincheckbox4").click(function () {
    if ($(this).prop("checked") == true) {
    //   console.log("the kids can play here")
      playArea = true;
    }
    else if ($(this).prop("checked") == false) {
    //   console.log("bring a toy.")
      playArea = false;
    }
  });
});

// Family Friendly is checked on the map sort feature
$(document).ready(function () {
  $("#inlinecheckbox5").click(function () {
    if ($(this).prop("checked") == true) {
    //   console.log("they like kids here");
      friendly = true;
    }
    else if ($(this).prop("checked") == false) {
    //   console.log("they were rude to kids here.");
      friendly = false;
    }
  });
});

