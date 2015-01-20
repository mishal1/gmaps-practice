var map;
var currentLocationMarker;
var infowindow;

function initialize() {
  var mapOptions = {
    zoom: 20
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'You are here!'
      });

      var currentLocationImage = "img/currentLocation.png"

      currentLocationMarker = new google.maps.Marker({
        map: map, 
        position: pos,
        icon: currentLocationImage
      })

      map.setCenter(pos);

      // var request = {
      //   location: pos,
      //   radius: 500
      // };

      // var service = new google.maps.places.PlacesService(map);
      // service.nearbySearch(request, callback);

    }, function() {
      handleNoGeolocation(true);
    });

  } else {
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);

// function moveMarker(marker){
//   if(navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//       currentLocationMarker.setPosition(pos)
//     }, function() {
//       handleNoGeolocation(true);
//     });
//   } else {
//     handleNoGeolocation(false);
//   }
//   setTimeout(moveMarker, 1000);
// };

// google.maps.event.addDomListener(window, 'load', moveMarker)

// google.maps.event.addDomListener(window, 'load', twitterMarker)

// function callback(results, status) {
//   console.log(results)
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       createMarker(results[i]);
//     }
//   }
// }

// function createMarker(place) {
//   var placeLoc = place.geometry.location;
//   var marker = new google.maps.Marker({
//     map: map,
//     position: placeLoc
//   });

//   google.maps.event.addListener(marker, 'click', function() {
//     infowindow = new google.maps.InfoWindow();
//     infowindow.setContent(place.name);
//     infowindow.open(map, this);
//   });
// }
