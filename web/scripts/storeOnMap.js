/* global google */

// declarations
var map, geocoder, infowindow, directionDisplay, directionService, directionDisplayDriving, directionDisplayWalking;
var markers 	= [];
var blueDot	= 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
var redDot	= 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
var myPlace 	= new google.maps.LatLng(35.338908,25.144229);
var places	= [
                    new google.maps.LatLng(35.338779, 25.137043),//home
                    //new google.maps.LatLng(35.34228, 25.13025), //marite
                    //new google.maps.LatLng(35.33966, 25.13091), //gue
                    //new google.maps.LatLng(35.33259, 25.13078), //think
                  ];
var placeName   = ['Heraklion Archaeological Museum',
                    'Mare Coffee Bar & Food',
                    'Guernica Bar',
                    'The Grave of Kazantakis'
                  ];
var polylineOptionsActual = new google.maps.Polyline({
                                strokeColor: '#FF0000',
                                strokeOpacity: 0.7,
                                strokeWeight: 7
                            });
// initialize the map
function initialize(){
        var mapProp = {
                center		: myPlace,
                zoom		: 15,
                mapTypeId	: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        geocoder = new google.maps.Geocoder();
        directionDisplayWalking = new google.maps.DirectionsRenderer({
            preserveViewport: true,
            polylineOptions: polylineOptionsActual
        });
        directionDisplayDriving = new google.maps.DirectionsRenderer({
            preserveViewport: true});
        directionService = new google.maps.DirectionsService();
        
        calcDistance();
}

// calculate the route
function calcRoute(start, end){
    directionDisplayWalking.setMap(map);
        directionDisplayDriving.setMap(map);
        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING,
        };
        directionService.route(request, function(result, status){
            if(status == google.maps.DirectionsStatus.OK){
                directionDisplayWalking.setDirections(result);
            }
        });
        
        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.WALKING,
        };
        directionService.route(request, function(result, status){
            if(status == google.maps.DirectionsStatus.OK){
                directionDisplayDriving.setDirections(result);
            }
        });
}

// calculate the distance
function calcDistance(){
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins		: [myPlace],
            destinations	: places,
            travelMode		: google.maps.TravelMode.DRIVING,
            avoidHighways	: false,
            avoidTolls		: false
          }, callback);
}

// callback method to calculate the distance between 2 places
function callback(response, status){
        if(status == google.maps.DistanceMatrixStatus.OK){
                var origins = response.originAddresses;
                var destinations = response.destinationAddresses;

                clearOverlays();

                var result = response.rows[0].elements;
                addMarker(origins[0], redDot, 'This is my current place'); // origin marker
                for(var i = 0; i < result.length; i++){
                        var distance = result[i].distance.text;
                        var duration = result[i].duration.text;
                        var from = origins[0];
                        var to = destinations[i];
                        var info = '<b>' + placeName[i] + '</b><br>'
                                    +'<b>Address:&nbsp</b>' + to + '<br>'
                                    +'<b>Distance:&nbsp</b>' + distance + '<br>'
                                    +'<b>Duration:&nbsp</b>' + duration + '(driving),'
                                    +'<br>';
                        addMarker(destinations[i], blueDot, info); // destination marker
                }
        }
}
// Sets the map on all markers in the array.
function setAllMap(map){
    for (var i = 1; i < markers.length; i++){
        markers[i].setMap(map);
    }
}
// adds a marker to the map
// also when a marker is clicked, it shows the route from the home place
function addMarker(location, icon, infos){
    geocoder.geocode({'address': location}, function(result, status){
        if(status == google.maps.GeocoderStatus.OK){
            if(icon === redDot){
                var marker = new google.maps.Marker({
                        map	: map,
                        position: result[0].geometry.location,
                        animation: google.maps.Animation.DROP,
                        icon	: icon,
                        html	: infos
                });
            }else{
                var marker = new google.maps.Marker({
                        map	: null,
                        position: result[0].geometry.location,
                        animation: google.maps.Animation.BOUNCE,
                        icon	: icon,
                        html	: infos
                });
            }
            markers.push(marker);
            infowindow	= new google.maps.InfoWindow({content: infos});
            //NEW
            setAllMap(map);
            infowindow.setContent(this.html);
            infowindow.open(map, this);
            calcRoute(myPlace, location);
            /////////////
//            google.maps.event.addListener(marker, 'click', function(){
//                if(icon === redDot){
//                    //setAllMap(map);  
//                }else{
//                    infowindow.setContent(this.html);
//                    infowindow.open(map, this);
//                    calcRoute(myPlace, location);
//                }
//            });
            google.maps.event.addListener(infowindow,'closeclick',function(){
                directionDisplayWalking.setMap(null); //remove the calculated walking route
                directionDisplayDriving.setMap(null); //remove the calculated driving route

            });
        }
    });
}

// optional function to clear markers's array
function clearOverlays(){
    if(markers){
        for(i in markers){
            markers[i].setMap(null);
        }
        markers.length = 0;
    }
}
google.maps.event.addDomListener(window, 'load', initialize);
