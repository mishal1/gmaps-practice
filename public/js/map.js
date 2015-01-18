function initialize() {
  var mapOptions = {
    center: { lat: 51.507351, lng: -0.127758},
    zoom: 20
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);