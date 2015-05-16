var map;
var markersArray = [];

function initMap()
{
    var latlng = new google.maps.LatLng(40.76832172749444, -73.9760971069336);
    var myOptions = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    // add a click event handler to the map object
    google.maps.event.addListener(map, "click", function(event)
    {
        // place a marker
        placeMarker(event.latLng);

        // display the lat/lng in your form's lat/lng fields
        document.getElementById("latFld").value = event.latLng.lat();
        document.getElementById("lngFld").value = event.latLng.lng();
    });
}
function placeMarker(location) {
    // first remove all markers if there are any
    deleteOverlays();

    var marker = new google.maps.Marker({
        position: location, 
        map: map
    });

    // add marker in markers array
    markersArray.push(marker);

    //map.setCenter(location);
}

// Deletes all markers in the array by removing references to them
function deleteOverlays() {
    if (markersArray) {
        for (i in markersArray) {
            markersArray[i].setMap(null);
        }
    markersArray.length = 0;
    }
}
//*********************************************
//* Functions for adding social media markers *
//*********************************************

function initResultMap() {
    // Change cor to the cor user choose
    var latlng = new google.maps.LatLng(40.76832172749444, -73.9760971069336);
    var myOptions = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    var loc = new google.maps.LatLng(40.76832172749444, -73.9760971069336);
    
    placeResultMarkers(loc);
}

function placeResultMarkers(loc) {
    // Loop json arry and place markers on the result map
    deleteOverlays();

    var marker = new google.maps.Marker({
      position: loc,
      map: map,
      title: 'Hello World!'
  });

    markersArray.push(marker);
}