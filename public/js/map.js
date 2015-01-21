var map;
var currentLocationMarker;
var infowindow;

function initialize() {
  var mapOptions = {
    zoom: 10
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
  var heatmap

  $.get( "/markers", function( data ) {
    var array = []
    // console.log(data)
    data.forEach(function(tweet){
     // createMarker(tweet);
      array.push(new google.maps.LatLng(tweet[0],
                                   tweet[1]))
    });
    var pointArray = new google.maps.MVCArray(array);
    heatmap = new google.maps.visualization.HeatmapLayer({
      data: pointArray
    });
    heatmap.set('radius', 20);
    heatmap.set('opacity', 1);
    // heatmap.set('dissipating', true);
    heatmap.setMap(map);
  });

 function createMarker(place) {
  var mposition = new google.maps.LatLng(place[0],
                                   place[1]);
   var marker = new google.maps.Marker({
     map: map,
     position: mposition
   });
 };

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


