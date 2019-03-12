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