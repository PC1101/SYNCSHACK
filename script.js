function initMap() {
  const mapCenter = { lat: 38.4237, lng: 27.1428 };

  const map = new google.maps.Map(document.getElementById('map'), {
    center: mapCenter,
    zoom: 14,
    disableDefaultUI: true
  });

  // Define theme styles
  const themes = {
    default: [],
    night: [/* night theme styles */],
    retro: [/* retro theme styles */],
    futuristic: [/* futuristic theme styles */]
  };

  // Function to change the map theme
  function changeMapTheme(theme) {
    map.setOptions({ styles: themes[theme] });
  }

  // Event listeners for theme buttons
  document.getElementById('defaultTheme').addEventListener('click', () => changeMapTheme('default'));
  document.getElementById('nightTheme').addEventListener('click', () => changeMapTheme('night'));
  document.getElementById('retroTheme').addEventListener('click', () => changeMapTheme('retro'));
  document.getElementById('futuristicTheme').addEventListener('click', () => changeMapTheme('futuristic'));

  // Custom control for zoom in
  document.getElementById('zoomIn').addEventListener('click', () => {
    map.setZoom(map.getZoom() + 1);
  });

  // Custom control for zoom out
  document.getElementById('zoomOut').addEventListener('click', () => {
    map.setZoom(map.getZoom() - 1);
  });

  // Custom control for map type (Map/Satellite)
  let isSatellite = false;
  document.getElementById('mapType').addEventListener('click', () => {
    isSatellite = !isSatellite;
    map.setMapTypeId(isSatellite ? 'satellite' : 'roadmap');
    document.getElementById('mapType').textContent = isSatellite ? 'Satellite' : 'Map';
  });

  // Custom control for fullscreen
  document.getElementById('fullscreen').addEventListener('click', () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  });

  // Geolocation code
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(userLocation);
        new google.maps.Marker({
          position: userLocation,
          map: map,
          title: "You are here!"
        });
      },
      function(error) {
        console.error('Error occurred. Error code: ' + error.code);
        handleLocationError(true, map.getCenter());
      }
    );
  } else {
    handleLocationError(false, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, pos) {
  alert(browserHasGeolocation ?
    "Error: The Geolocation service failed." :
    "Error: Your browser doesn't support geolocation.");
}

google.maps.event.addDomListener(window, 'load', initMap);
