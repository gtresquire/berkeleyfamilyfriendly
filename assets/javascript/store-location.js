  
  
  
  // Googlemaps API
  
  // Old Google heat map

  // var map;
  // function initMap() {
  //   map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 2,
  //     center: new google.maps.LatLng(2.8, -187.3),
  //     mapTypeId: 'terrain'
  //   });

  //   // Create a <script> tag and set the USGS URL as the source.
  //   var script = document.createElement('script');
  //   // This example uses a local copy of the GeoJSON stored at
  //   // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  //   script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
  //   document.getElementsByTagName('head')[0].appendChild(script);
  //   console.log("from initMap =>" + script)
  // }


  // <script>  New GoogleApi for Gelocator below:
  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: 37.869061, lng: -122.270462 }
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function() {
      geocodeAddress(geocoder, map);
    });
  }

  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
// </script>


  // Loop through the results array and place a marker for each
  // set of coordinates.
  window.eqfeed_callback = function (results) {
    for (var i = 0; i < results.features.length; i++) {
      var coords = results.features[i].geometry.coordinates;
      var latLng = new google.maps.LatLng(coords[1], coords[0]);
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
    }
  }  
  // Initialize Firebase
  let config = {
    apiKey: keys.FIREBASE,
    authDomain: "cool-kids-81481.firebaseapp.com",
    databaseURL: "https://cool-kids-81481.firebaseio.com",
    projectId: "cool-kids-81481",
    storageBucket: "cool-kids-81481.appspot.com",
    messagingSenderId: "905740305108"
  };

  console.log(config)
  firebase.initializeApp(config);

  console.log(firebase);

  let database = firebase.database();
  console.log(database);

  // mock data
  let data = {
    sender: null,
    timestamp: null,
    lat: null,
    lng: null
  };

  // Mara is a teacher with 2 children who works as a professor at the university
  // let user = {
  //   name: "Mara",
  //   children: 2,
  //   email: "mara@university.edu",
  //   // picture: "", // can we store images on firebase?
  //   reviews: []
  // };

  // let reviews = {
  //   reviewer: "Mara", // name of user, string
	//   location: ["Boscos", data], // name of place, string or tuple with lat and longittude?
	//   rating: 3, // num between 1 and 5, integer
	//   message: "It was fine." // the review of the location, string
  // };

  // let location = {
  //   hasBabyStation: false, // bool
	//   hasParking: true, // bool
	//   hasDriveThru: false, // bool?
	//   rating: null, // number between 1 and 5? avg of review rattings?
	//   business: "restaurant", // string
	//   reviews: [], // array of review object
	//   usersReviewed: 0 // number of the users who have reviewed this location
  // }

  // database.ref("/user").set();

  function makeInfoBox(controlDiv, map) {
    // Set CSS for the control border.
    let controlUI = document.createElement('div');
    controlUI.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '2px';
    controlUI.style.marginBottom = '22px';
    controlUI.style.marginTop = '10px';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    let controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '100%';
    controlText.style.padding = '6px';
    controlText.textContent = 'The map shows all clicks made in the last 10 minutes.';
    controlUI.appendChild(controlText);
  }

  /**
  * Starting point for running the program. Authenticates the user.
  * @param {function()} onAuthSuccess - Called when authentication succeeds.
  */
  function initAuthentication(onAuthSuccess) {
    firebase.authAnonymously(function(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        data.sender = authData.uid;
        onAuthSuccess();
      }
    }, {remember: 'sessionOnly'});  // Users will get a new id for every session.
  }

  /**
   * Creates a map object with a click listener and a heatmap.
   */
  // function initMap() {
  //   let map = new google.maps.Map(document.getElementById('map'), {
  //     center: {lat: 0, lng: 0},
  //     zoom: 3,
  //     styles: [{
  //       featureType: 'poi',
  //       stylers: [{ visibility: 'off' }]  // Turn off POI.
  //     },
  //     {
  //       featureType: 'transit.station',
  //       stylers: [{ visibility: 'off' }]  // Turn off bus, train stations etc.
  //     }],
  //     disableDoubleClickZoom: true,
  //     streetViewControl: false,
  //   });

  //   // Create the DIV to hold the control and call the makeInfoBox() constructor
  //   // passing in this DIV.
  //   let infoBoxDiv = document.createElement('div');
  //   makeInfoBox(infoBoxDiv, map);
  //   map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoBoxDiv);

  //   // Listen for clicks and add the location of the click to firebase.
  //   map.addListener('click', function(e) {
  //     data.lat = e.latLng.lat();
  //     data.lng = e.latLng.lng();
  //     addToFirebase(data);
  //   });

  //   // Create a heatmap.
  //   let heatmap = new google.maps.visualization.HeatmapLayer({
  //     data: [],
  //     map: map,
  //     radius: 16
  //   });

  //   initAuthentication(initFirebase.bind(undefined, heatmap));
  // }

  /**
   * Set up a Firebase with deletion on clicks older than expirySeconds
   * @param {!google.maps.visualization.HeatmapLayer} heatmap The heatmap to
   * which points are added from Firebase.
   */


  //  Old Googlemap Heatmap function commented out on Sunday.. 

  // function initFirebase(heatmap) {

  //   // 10 minutes before current time.
  //   let startTime = new Date().getTime() - (60 * 10 * 1000);

  //   // Reference to the clicks in Firebase.
  //   let clicks = firebase.child('clicks');

  //   // Listener for when a click is added.
  //   clicks.orderByChild('timestamp').startAt(startTime).on('child_added',
  //     function(snapshot) {

  //       // Get that click from firebase.
  //       let newPosition = snapshot.val();
  //       let point = new google.maps.LatLng(newPosition.lat, newPosition.lng);
  //       let elapsed = new Date().getTime() - newPosition.timestamp;

  //       // Add the point to  the heatmap.
  //       heatmap.getData().push(point);

  //       // Requests entries older than expiry time (10 minutes).
  //       let expirySeconds = Math.max(60 * 10 * 1000 - elapsed, 0);
  //       // Set client timeout to remove the point after a certain time.
  //       window.setTimeout(function() {
  //         // Delete the old point from the database.
  //         snapshot.ref().remove();
  //       }, expirySeconds);
  //     }
  //   );

  //   // Remove old data from the heatmap when a point is removed from firebase.
  //   clicks.on('child_removed', function(snapshot, prevChildKey) {
  //     let heatmapData = heatmap.getData();
  //     let i = 0;
  //     while (snapshot.val().lat != heatmapData.getAt(i).lat()
  //       || snapshot.val().lng != heatmapData.getAt(i).lng()) {
  //       i++;
  //     }
  //     heatmapData.removeAt(i);
  //   });
  // }
///////end commented out Sunday




  /**
   * Updates the last_message/ path with the current timestamp.
   * @param {function(Date)} addClick After the last message timestamp has been updated,
   *     this function is called with the current timestamp to add the
   *     click to the firebase.
   */
  function getTimestamp(addClick) {
    // Reference to location for saving the last click time.
    let ref = firebase.child('last_message/' + data.sender);

    ref.onDisconnect().remove();  // Delete reference from firebase on disconnect.

    // Set value to timestamp.
    ref.set(Firebase.ServerValue.TIMESTAMP, function(err) {
      if (err) {  // Write to last message was unsuccessful.
        console.log(err);
      } else {  // Write to last message was successful.
        ref.once('value', function(snap) {
          addClick(snap.val());  // Add click with same timestamp.
        }, function(err) {
          console.warn(err);
        });
      }
    });
  }

  /**
   * Adds a click to firebase.
   * @param {Object} data The data to be added to firebase.
   *     It contains the lat, lng, sender and timestamp.
   */
  function addToFirebase(data) {
    getTimestamp(function(timestamp) {
      // Add the new timestamp to the record data.
      data.timestamp = timestamp;
      let ref = firebase.child('clicks').push(data, function(err) {
        if (err) {  // Data was not written to firebase.
          console.warn(err);
        }
      });
    });
  }

  $("body").append('<script src="https://maps.googleapis.com/maps/api/js?key='+keys.GOOGLE_MAPS+'&callback=initMap">')
 