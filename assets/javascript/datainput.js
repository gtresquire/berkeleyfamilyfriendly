console.log("Hello data input")



var username = document.getElementById("username")
var location_name = document.getElementById("locationName")
var address = document.getElementById("address")
var comment = document.getElementById("comment")

var drivethru = false;
var parking = false;
var babyChanger = false;
var playArea = false;
var friendly = false;

var parentplace = {
    username : username,
    title : location_name,
    address : address,
    comment : Comment,
    drivethru : drivethru,
    parking : parking,
    changer : babyChanger,
    play : playArea,
    friendly : friendly
}

// funtion to send data to fier base from the user input form
function senddata() {
    console.log("send data to firebase")
    // database.ref().push(parentplace);
}

function sortmap (){
    console.log("sort the map")
    // logic goes here for what to show and hide
}

// When submit button is clicked we will fire the funtion that sends the data to firebase
$("#submit").on("click", senddata);


// Parking is checked on the user input form 
$(document).ready(function(){
    $("#checkbox1").click(function(){
        if($(this).prop("checked") == true){
            console.log("we got parking")
            parking = true;
        }
        else if($(this).prop("checked") == false){
            console.log("no parking")
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
$(document).ready(function(){
    $("#checkbox4").click(function(){
        if($(this).prop("checked") == true){
            console.log("the kids can play here")
            playArea = true;
        }
        else if($(this).prop("checked") == false){
            console.log("bring a toy.")
            playArea = false;
        }
    });
});

// Family Friendly is checked on user input form
$(document).ready(function(){
    $("#checkbox5").click(function(){
        if($(this).prop("checked") == true){
            console.log("they like kids here")
            friendly = true;
        }
        else if($(this).prop("checked") == false){
            console.log("they were rude to kids here.")
            friendly = false;
        }
    });
});


// Parking is checked on the map sort feature
$(document).ready(function(){
    $("#inlincheckbox1").click(function(){
        if($(this).prop("checked") == true){
            console.log("we got parking")
            parking = true;
        }
        else if($(this).prop("checked") == false){
            console.log("no parking")
            parking = false;
        }
    });
});

//  Baby Changer is checked on the map sort feature
    $("#inlincheckbox2").click(function(){
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

// Drive Thru is checked on the map sort feature
$(document).ready(function(){
    $("#inlincheckbox3").click(function(){
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

// Play Area is checked on the map sort feature
$(document).ready(function(){
    $("#inlincheckbox4").click(function(){
        if($(this).prop("checked") == true){
            console.log("the kids can play here")
            playArea = true;
        }
        else if($(this).prop("checked") == false){
            console.log("bring a toy.")
            playArea = false;
        }
    });
});

// Family Friendly is checked on the map sort feature
$(document).ready(function(){
    $("#inlinecheckbox5").click(function(){
        if($(this).prop("checked") == true){
            console.log("they like kids here")
            friendly = true;
        }
        else if($(this).prop("checked") == false){
            console.log("they were rude to kids here.")
            friendly = false;
        }
    });
});









