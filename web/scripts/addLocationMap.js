/* global google */

// declarations
var map, geocoder;
var marker 	= null;

var infowindow = new google.maps.InfoWindow({
    size: new google.maps.Size(150,50)
});

// initialize the map
function initialize(){
    var mapProp = {
            center		: new google.maps.LatLng(35.338908,25.144229),
            zoom		: 14,
            mapTypeId	: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    geocoder = new google.maps.Geocoder();

    google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
    });

    google.maps.event.addListener(map, 'click', function(event) {
        //call function to create marker
        if (marker) {
           marker.setMap(null);
           marker = null;
        }
        marker = addMarker(event.latLng, "<b>Location</b><br>"+event.latLng);
    });
}


// adds a marker to the map
// also when a marker is clicked, it shows the route from the home place
function addMarker(latlng, content) {
    
    var marker = new google.maps.Marker({
        position: latlng,
        map: map
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(content); 
        infowindow.open(map,marker);
    });
    
    google.maps.event.trigger(marker, 'click');   
    
    return marker;
}

google.maps.event.addDomListener(window, 'load', initialize);