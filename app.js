const map = L.map('map').setView([0, 0], 13); // Initialize map with default position

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

// Get user's location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      map.setView([latitude, longitude], 15); // Set map center to user's location

      // Add marker to the map
      L.marker([latitude, longitude]).addTo(map).bindPopup("You are here!").openPopup();

      // Update status
      document.getElementById("status").textContent = "You are here!";
    },
    () => {
      document.getElementById("status").textContent = "Unable to get your location.";
    }
  );
} else {
  document.getElementById("status").textContent = "Geolocation is not supported by your browser.";
}
