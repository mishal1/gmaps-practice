var map;
var currentLocationMarker;

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
        map:map, 
        position: pos,
        icon: currentLocationImage
      })

      map.setCenter(pos);
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

function moveMarker(marker){
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      currentLocationMarker.setPosition(pos)
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    handleNoGeolocation(false);
  }
    setTimeout(function(){
       if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(51.538933, -0.177112);
      currentLocationMarker.setPosition(pos)
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    handleNoGeolocation(false);
  }
    }, 10000);
};

google.maps.event.addDomListener(window, 'load', moveMarker)


