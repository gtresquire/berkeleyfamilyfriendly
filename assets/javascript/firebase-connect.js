// This script is for initializing the connection to the Cool Kidzzz database in firebase
// This is where we will be storing user information, customer reviews, and location data
// You must call this script first, before calling other scripts that require a connection
// to firebase.


// Initialize Firebase
let config = {
  apiKey: keys.FIREBASE,
  authDomain: "cool-kids-81481.firebaseapp.com",
  databaseURL: "https://cool-kids-81481.firebaseio.com",
  projectId: "cool-kids-81481",
  storageBucket: "cool-kids-81481.appspot.com",
  messagingSenderId: "905740305108"
};

firebase.initializeApp(config);

let database = firebase.database();

var username;
var location_name;
var address;
var city;
var state;
var zip;
var fullAddress;


var drivethru = false;
var parking = false;
var babyChanger = false;
var playArea = false;
var friendly = false;



// funtion to send data to fier base from the user input form
function senddata() {
  console.log("send data to firebase");
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


  var parentplace = {
    username: username,
    title: location_name,
    address: fullAddress,
    comment: comment,
    drivethru: drivethru,
    parking: parking,
    changer: babyChanger,
    play: playArea,
    friendly: friendly
  }

  database.ref("/location/" + parentplace.title).set(parentplace);

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
//   var currentdata = snapshot.val();
//   console.log(currentdata);
//   console.log(currentdata.location.address);
//   console.log(currentdata.location.username);
//   console.log(currentdata.location.comment);

  var tableRef = document.getElementById('tableData');
  console.log(tableRef);
  // Insert a row in the table at row index 0
  var newRow   = tableRef.insertRow(tableRef.rows.length);

  // Insert a cell in the row at index 0-5
  var data1  = newRow.insertCell(0);
  var data2  = newRow.insertCell(1);
  var data3  = newRow.insertCell(2);
  var data4  = newRow.insertCell(3);
  var data5  = newRow.insertCell(4);
  var data6  = newRow.insertCell(5);

  // Append a text node to the cell
 // var newText  = document.createTextNode('test node');

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
 // senddata();
  appendTable();
});


//Parking is checked on the user input form 
$(document).ready(function(){
    $("#checkbox1").click(function(){
        if($(this).prop("checked") == true){
            console.log("we got parking");
            parking = true;
        }
        else if($(this).prop("checked") == false){
            console.log("no parking");
            parking = false;
        }
    });
});

//  Baby Changer is checked on the user input form
$(document).ready(function(){
    $("#checkbox2").click(function(){
        if($(this).prop("checked") == true){
            console.log("we got diapers")
            babyChanger = true;
        }
        else if($(this).prop("checked") == false){
            console.log("no diapers here")
            babyChanger = false;
        }
    });
});

// Drive Thru is checked on the user input form
$(document).ready(function(){
    $("#checkbox3").click(function(){
        if($(this).prop("checked") == true){
            console.log("stay in the car!!")
            drivethru = true;
        }
        else if($(this).prop("checked") == false){
            console.log("you'll have to get out.")
            drivethru = false;
        }
    });
});

// Pay Area is checked on the user input form
$(document).ready(function () {
  $("#checkbox4").click(function () {
    if ($(this).prop("checked") == true) {
      console.log("the kids can play here")
      playArea = true;
    }
    else if ($(this).prop("checked") == false) {
      console.log("bring a toy.")
      playArea = false;
    }
  });
});

// Family Friendly is checked on user input form
$(document).ready(function () {
  $("#checkbox5").click(function () {
    if ($(this).prop("checked") == true) {
      console.log("they like kids here");
      friendly = true;
    }
    else if ($(this).prop("checked") == false) {
      console.log("they were rude to kids here.");
      friendly = false;
    }
  });
});


// Parking is checked on the map sort feature
$(document).ready(function () {
  $("#inlincheckbox1").click(function () {
    if ($(this).prop("checked") == true) {
      console.log("we got parking");
      parking = true;
    }
    else if ($(this).prop("checked") == false) {
      console.log("no parking");
      parking = false;
    }
  });
});

//  Baby Changer is checked on the map sort feature
$("#inlincheckbox2").click(function () {
  if ($(this).prop("checked") == true) {
    console.log("we got diapers")
    babyChanger = true;
  }
  else if ($(this).prop("checked") == false) {
    console.log("no diapers here")
    babyChanger = false;
  }
});

// Drive Thru is checked on the map sort feature
$(document).ready(function () {
  $("#inlincheckbox3").click(function () {
    if ($(this).prop("checked") == true) {
      console.log("stay in the car!!")
      drivethru = true;
    }
    else if ($(this).prop("checked") == false) {
      console.log("you'll have to get out.")
      drivethru = false;
    }
  });
});

// Play Area is checked on the map sort feature
$(document).ready(function () {
  $("#inlincheckbox4").click(function () {
    if ($(this).prop("checked") == true) {
      console.log("the kids can play here")
      playArea = true;
    }
    else if ($(this).prop("checked") == false) {
      console.log("bring a toy.")
      playArea = false;
    }
  });
});

// Family Friendly is checked on the map sort feature
$(document).ready(function () {
  $("#inlinecheckbox5").click(function () {
    if ($(this).prop("checked") == true) {
      console.log("they like kids here");
      friendly = true;
    }
    else if ($(this).prop("checked") == false) {
      console.log("they were rude to kids here.");
      friendly = false;
    }
  });
});

