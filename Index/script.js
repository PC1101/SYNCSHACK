let map;
let events = [];

function initMap() {
    const mapCenter = { lat: 38.4237, lng: 27.1428 };

    map = new google.maps.Map(document.getElementById('map'), {
        center: mapCenter,
        zoom: 14,
        disableDefaultUI: true
    });

    const themes = {
        default: [],
        night: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }]
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }]
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#263c3f" }]
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6b9a76" }]
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }]
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }]
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9ca5b3" }]
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#746855" }]
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#1f2835" }]
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#f3d19c" }]
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#2f3948" }]
            },
            {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }]
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#515c6d" }]
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#17263c" }]
            }
          ],
          retro: [
            { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
            {
              featureType: "administrative",
              elementType: "geometry.stroke",
              stylers: [{ color: "#c9b2a6" }]
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "geometry.stroke",
              stylers: [{ color: "#dcd2be" }]
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "labels.text.fill",
              stylers: [{ color: "#ae9e90" }]
            },
            {
              featureType: "landscape.natural",
              elementType: "geometry",
              stylers: [{ color: "#dfd2ae" }]
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ color: "#dfd2ae" }]
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#93817c" }]
            },
            {
              featureType: "poi.park",
              elementType: "geometry.fill",
              stylers: [{ color: "#a5b076" }]
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#447530" }]
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#f5f1e6" }]
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#5b5b5b" }]
            },
            {
              featureType: "road",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#f5f1e6" }]
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#fdfcf8" }]
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#5b5b5b" }]
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#f5f1e6" }]
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#f2f2f2" }]
            },
            {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [{ color: "#e9e9e9" }]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#c9c9c9" }]
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#5e5e5e" }]
            }
          ],
          futuristic: [
            { elementType: "geometry", stylers: [{ color: "#000000" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#000000" }] },
            {
              featureType: "administrative",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }]
            },
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [{ color: "#333333" }]
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ color: "#333333" }]
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#000000" }]
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#ffffff" }]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#000000" }]
            }
          ]
    };

    function setMapTheme(theme) {
        map.setOptions({ styles: themes[theme] || [] });
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(userLocation);

                const userMarker = new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "You are here!",
                    icon: {
                        url: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png', // Purple marker icon
                        scaledSize: new google.maps.Size(50, 50),
                        labelOrigin: new google.maps.Point(25, 25)
                    },
                });

                function toggleBounce() {
                    userMarker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(() => {
                        userMarker.setAnimation(null);
                    }, 700); // Stop bouncing after 0.7 seconds
                }

                // Bounce 5 times
                for (let i = 0; i < 5; i++) {
                    setTimeout(toggleBounce, i * 1000); // Adjust the interval between bounces
                }

                // Place additional markers at random nearby locations
                const randomLocations = generateRandomLocations(userLocation, 4);

                randomLocations.forEach((location, index) => {
                    new google.maps.Marker({
                        position: location,
                        map: map,
                        title: `Random Marker ${index + 1}`,
                        icon: {
                            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                            scaledSize: new google.maps.Size(30, 30)
                        }
                    });
                });
            },
            function (error) {
                console.error('Error occurred. Error code: ' + error.code);
                handleLocationError(true, map.getCenter());
            }
        );
    } else {
        handleLocationError(false, map.getCenter());
    }

    // Theme switch event listeners
    document.getElementById('defaultTheme').addEventListener('click', () => setMapTheme('default'));
    document.getElementById('nightTheme').addEventListener('click', () => setMapTheme('night'));
    document.getElementById('retroTheme').addEventListener('click', () => setMapTheme('retro'));
    document.getElementById('futuristicTheme').addEventListener('click', () => setMapTheme('futuristic'));
}

function generateRandomLocations(center, count) {
    const locations = [];
    for (let i = 0; i < count; i++) {
        const randomLatOffset = (Math.random() - 0.5) * 0.02; // Random offset within ±0.01
        const randomLngOffset = (Math.random() - 0.5) * 0.02; // Random offset within ±0.01
        locations.push({
            lat: center.lat + randomLatOffset,
            lng: center.lng + randomLngOffset
        });
    }
    return locations;
}

function populateEventDropdown() {
    const dropdown = document.getElementById('eventDropdown');
    events.forEach((event, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = event.title;
        dropdown.appendChild(option);
    });
}

document.getElementById('searchInput').addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm)
    );
    updateEventDropdown(filteredEvents);
});

document.getElementById('eventDropdown').addEventListener('change', function (e) {
    const selectedIndex = e.target.value;
    if (selectedIndex !== "") {
        const selectedEvent = events[selectedIndex];
        map.setCenter({ lat: parseFloat(selectedEvent.latitude), lng: parseFloat(selectedEvent.longitude) });
    }
});

function updateEventDropdown(filteredEvents) {
    const dropdown = document.getElementById('eventDropdown');
    dropdown.innerHTML = '<option value="">Select an event</option>';
    filteredEvents.forEach((event, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = event.title;
        dropdown.appendChild(option);
    });
}

fetch('output.json')
    .then(response => response.json())
    .then(data => {
        if (data.eventbrite && data.eventbrite.music) {
            events = data.eventbrite.music;
            populateEventDropdown();
        } else {
            console.error('Expected event data not found in JSON');
        }
        initMap(); // Call initMap after loading the data
    })
    .catch(error => {
        console.error('Error loading event data:', error);
        initMap(); // Still call initMap even if event loading fails
    });

window.onload = () => {
    // initMap is now called after loading event data
};
