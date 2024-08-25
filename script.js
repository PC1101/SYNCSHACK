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
            // ... more night theme styles
        ],
        retro: [
            { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
            // ... more retro theme styles
        ],
        futuristic: [
            { elementType: "geometry", stylers: [{ color: "#000000" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
            // ... more futuristic theme styles
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
                const marker = new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "You are here!",
                    icon: {
                        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                        scaledSize: new google.maps.Size(50, 50),
                        labelOrigin: new google.maps.Point(25, 25)
                    },
                });

                function toggleBounce() {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(() => {
                        marker.setAnimation(null);
                    }, 5000); // Stop bouncing after 5 seconds
                }

                toggleBounce(); // Initial bounce
                setInterval(toggleBounce, 8000);
            },
            function (error) {
                console.error('Error occurred. Error code: ' + error.code);
                handleLocationError(true, map.getCenter());
            }
        );
    } else {
        handleLocationError(false, map.getCenter());
    }

    document.getElementById('defaultTheme').addEventListener('click', () => setMapTheme('default'));
    document.getElementById('nightTheme').addEventListener('click', () => setMapTheme('night'));
    document.getElementById('retroTheme').addEventListener('click', () => setMapTheme('retro'));
    document.getElementById('futuristicTheme').addEventListener('click', () => setMapTheme('futuristic'));
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
