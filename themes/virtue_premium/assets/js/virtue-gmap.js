
function initVirtueMap() {
	var virtueGMaps = [];
	var virtueGMapGeocoder = new google.maps.Geocoder();
	var virtueGMapElements = document.querySelectorAll( '.kt-gmap-js-init' );
	for ( let i = 0; i < virtueGMapElements.length; i++ ) {
		var isDraggable = window.innerWidth > 480 ? true : false;
		var scrollwheel = virtueGMapElements[ i ].getAttribute('data-map-scrollwheel');
		var maptype = virtueGMapElements[ i ].getAttribute('data-maptype');
		var mapzoom = parseFloat( virtueGMapElements[ i ].getAttribute('data-mapzoom') );
		var address1 = virtueGMapElements[ i ].getAttribute('data-address1');
		var address2 = virtueGMapElements[ i ].getAttribute('data-address2');
		var address3 = virtueGMapElements[ i ].getAttribute('data-address3');
		var address4 = virtueGMapElements[ i ].getAttribute('data-address4');
		var position1 = virtueGMapElements[ i ].getAttribute('data-position1');
		var position2 = virtueGMapElements[ i ].getAttribute('data-position2');
		var position3 = virtueGMapElements[ i ].getAttribute('data-position3');
		var position4 = virtueGMapElements[ i ].getAttribute('data-position4');
		var title1 = virtueGMapElements[ i ].getAttribute('data-title1');
		var title2 = virtueGMapElements[ i ].getAttribute('data-title2');
		var title3 = virtueGMapElements[ i ].getAttribute('data-title3');
		var title4 = virtueGMapElements[ i ].getAttribute('data-title4');
		var mapcenter = virtueGMapElements[ i ].getAttribute('data-mapcenter');
		var type = google.maps.MapTypeId.ROADMAP;
		if( maptype == 'ROADMAP' ) {
			type = google.maps.MapTypeId.ROADMAP;
		} else if ( maptype == 'HYBRID' ) {
			type = google.maps.MapTypeId.HYBRID;
		} else if ( maptype == 'TERRAIN' ) {
			type = google.maps.MapTypeId.TERRAIN;
		} else if ( maptype == 'SATELLITE' ) {
			type = google.maps.MapTypeId.SATELLITE;
		}
		if ( scrollwheel ) {
			var scrollwheel_setting = scrollwheel;
		} else {
			var scrollwheel_setting = false;
		}
		var args = {
			center: ( position1 ? { lat:parseInt( mapcenter.split(',')[0] ), lng:parseInt( mapcenter.split(',')[1] ) } : { lat: 0, lng: 0 } ),  // This will be overridden once we have the address geocoded
			zoom:mapzoom,
			draggable: isDraggable,
			mapTypeControl: true,
			mapTypeId: type,
			scrollwheel: scrollwheel_setting,
			panControl: true,
			rotateControl: false,
			scaleControl: true,
			streetViewControl: true,
			zoomControl: true,
		}

		virtueGMaps[i] = new google.maps.Map(virtueGMapElements[ i ], args);
		if ( position1 ) {
			var position = { lat:parseInt( position1.split(',')[0] ), lng:parseInt( position1.split(',')[1] ) };
			virtueGMapPositionMarker( virtueGMaps[i], position, ( title1 ? '<div class="mapinfo"><h5>' + title1 + '</h5>' + address1 + '</div>' : '<div class="mapinfo">' + address1 + '</div>' ) );
		} else {
			var address = mapcenter; // For example, Google HQ
			virtueGMapGeocodeAddress(virtueGMapGeocoder, virtueGMaps[i], address, ( title1 ? '<div class="mapinfo"><h5>' + title1 + '</h5>' + address1 + '</div>' : '<div class="mapinfo">' + address1 + '</div>' ), true );
		}
		if ( address2 || position2 ) {
			if ( position2 ) {
				virtueGMapPositionMarker( virtueGMaps[i], { lat:parseInt( position2.split(',')[0] ), lng:parseInt( position2.split(',')[1] ) }, ( title2 ? '<div class="mapinfo"><h5>' + title2 + '</h5>' + address2 + '</div>' : '<div class="mapinfo">' + address2 + '</div>' ) );
			} else {
				virtueGMapGeocodeAddress(virtueGMapGeocoder, virtueGMaps[i], address2, ( title2 ? '<div class="mapinfo"><h5>' + title2 + '</h5>' + address2 + '</div>' : '<div class="mapinfo">' + address2 + '</div>' ) );
			}
		}
		if ( address3 || position3 ) {
			if ( position3 ) {
				virtueGMapPositionMarker( virtueGMaps[i], { lat:parseInt( position3.split(',')[0] ), lng:parseInt( position3.split(',')[1] ) }, ( title3 ? '<div class="mapinfo"><h5>' + title3 + '</h5>' + address3 + '</div>' : '<div class="mapinfo">' + address3 + '</div>' ) );
			} else {
				virtueGMapGeocodeAddress(virtueGMapGeocoder, virtueGMaps[i], address3, ( title3 ? '<div class="mapinfo"><h5>' + title3 + '</h5>' + address3 + '</div>' : '<div class="mapinfo">' + address3 + '</div>' ) );
			}
		}
		if ( address4 || position4 ) {
			if ( position4 ) {
				virtueGMapPositionMarker( virtueGMaps[i], { lat:parseInt( position4.split(',')[0] ), lng:parseInt( position4.split(',')[1] ) }, ( title4 ? '<div class="mapinfo"><h5>' + title4 + '</h5>' + address4 + '</div>' : '<div class="mapinfo">' + address4 + '</div>' ) );
			} else {
				virtueGMapGeocodeAddress(virtueGMapGeocoder, virtueGMaps[i], address4, ( title4 ? '<div class="mapinfo"><h5>' + title4 + '</h5>' + address4 + '</div>' : '<div class="mapinfo">' + address4 + '</div>' ) );
			}
		}
	}
};
function virtueGMapGeocodeAddress(geocoder, resultsMap, address, infoContent, center = false) {
	geocoder.geocode({ 'address': address }, function (results, status) {
		if (status === 'OK') {
			if ( center ) {
				resultsMap.setCenter(results[0].geometry.location);
			}
			const marker = new google.maps.Marker({
				map: resultsMap,
				position: results[0].geometry.location
			});
			const infowindow = new google.maps.InfoWindow({
				content: infoContent
			});

			marker.addListener('click', function() {
				infowindow.open(resultsMap, marker);
			});
		} else {
			console.log('Geocode was not successful for the following reason: ' + status);
		}
	});
};
function virtueGMapPositionMarker(resultsMap, position, infoContent) {
	const marker = new google.maps.Marker({
		map: resultsMap,
		position: position
	});
	const infowindow = new google.maps.InfoWindow({
		content: infoContent,
	});
	marker.addListener('click', function() {
		infowindow.open(resultsMap, marker);
	});
};
