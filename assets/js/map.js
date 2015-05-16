var map;
var markersArray = [];

function initMap() {
    var latlng = new google.maps.LatLng(40.76832172749444, -73.9760971069336);
    var myOptions = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    // add a click event handler to the map object
    google.maps.event.addListener(map, "click", function (event) {
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
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    var loc = new google.maps.LatLng(40.76832172749444, -73.9760971069336);

    placeResultMarkers(loc);
}




function placeResultMarkers(loc) {
    // Loop json arry and place markers on the result map
    deleteOverlays();

    var image = {
        url: 'js/icons/fb-icon.svg',
        // This marker is 20 pixels wide by 32 pixels tall.
        //size: new google.maps.Size(20, 20),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0,0),
        // The anchor for this image is the base of the flagpole at 0,32.
        anchor: new google.maps.Point(0, 32)
    };

    // Shapes define the clickable region of the icon.
    // The type defines an HTML &lt;area&gt; element 'poly' which
    // traces out a polygon as a series of X,Y points. The final
    // coordinate closes the poly by connecting to the first
    // coordinate.
    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18 , 1],
        type: 'poly'
    };

    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        icon: image,
        shape: shape,
        title: 'Hello World',
        zIndex: 3
    });

    markersArray.push(marker);
}











