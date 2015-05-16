var map;
var markersArray = [];

function initMap() {
    var latlng = new google.maps.LatLng(40.76832172749444, -73.9760971069336);
    var myOptions = {
        zoom: 10,
        center: latlng,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("mapCanvas"), myOptions);

    setupSearch();

    // add a click event handler to the map object
    google.maps.event.addListener(map, "click", function (event) {
        initResultMap(event.latLng);
    });
}

function setupSearch() {
    // Create the search box and link it to the UI element.
    var input = /** @type {HTMLInputElement} */(document.getElementById('bigSearch'));
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var searchBox = new google.maps.places.SearchBox(
        /** @type {HTMLInputElement} */(input));

    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length != 1) {
            return;
        }

        initResultMap(places[0].geometry.location);
    });
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

function initResultMap(latLng) {

    deleteOverlays();

    var latFromUser = latLng.lat();
    var lngFromUser = latLng.lng();

    // GET to backend
    $.get( '/api', {lat: latFromUser, lng: lngFromUser}, function( data ) {

        createMarkers(data.yikyak, "js/icons/yikyak-icon.svg");
        createMarkers(data.nytimes, "js/icons/nyt-icon.svg");
        createMarkers(data.instagram, "js/icons/instagram-icon.svg");
        createMarkers(data.twitter, "js/icons/twitter-icon.svg");

        loadSidebar(data);
    });

    map.set('zoom', 15);
    map.set('center', latLng);

    // Create Map
    // Change cor to the cor user choose
    var options = {
        zoom: 14,
        center: latLng,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("mapCanvas"), options);
    google.maps.event.addListener(map, "click", function (event) {
        initResultMap(event.latLng);
    });
}

function createMarkers(apiData, icon) {
    apiData.forEach( function(post) {
        var cor = new google.maps.LatLng(post.lat, post.lng);
        placeResultMarkers(cor, icon);
    });
}

function placeResultMarkers(loc, icon) {
    // Loop json arry and place markers on the result map
   // deleteOverlays();

    var image = {
        url: icon,
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
        zIndex: 3,
        animation: google.maps.Animation.DROP
    });


    // Add Marker
    markersArray.push(marker);
}












