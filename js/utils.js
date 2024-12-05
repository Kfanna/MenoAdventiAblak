// Helyekhez tartozó hanglejátszás állapotának nyomon követése
const playedSounds = {};

// Audio lejátszás funkció
function playAlertSound() {
  const audio = new Audio('sounds/alert.mp3'); // Hangfájl elérési útvonala
  audio.play().catch(error => console.error("Hiba a hang lejátszása közben:", error));
}

// Helymeghatározás figyelése
navigator.geolocation.watchPosition(
  (position) => {
    const userCoords = [position.coords.latitude, position.coords.longitude];

    // Ellenőrizze a helyszínek távolságát
    locations.forEach(location => {
      const distance = calculateDistance(userCoords, location.coords);

      if (distance <= 5) {
        // Ha közel van, ellenőrizzük, hogy már lejátszódott-e a hang
        if (!playedSounds[location.name]) {
          playAlertSound(); // Figyelmeztető hang lejátszása
          playedSounds[location.name] = true; // Jelöljük, hogy a hang már lejátszódott
        }

        // Popup megjelenítése (ha nincs megnyitva)
        const marker = L.marker(location.coords, { icon: customIcon }).addTo(map);
        marker.bindPopup(`
          <div style="font-family: 'Arial', sans-serif; line-height: 1.6; max-width: 300px;">
            <h3 style="color: #6BA3BE;">${location.name}</h3>
            <p><strong>Cím:</strong> ${location.address}</p>
            <p style="font-style: italic;">${location.story}</p>
          </div>
        `).openPopup();
      } else {
        // Ha a felhasználó elhagyja a helyszínt, állítsuk vissza a hang állapotát
        playedSounds[location.name] = false;
      }
    });
  },
  (error) => {
    console.error("Helymeghatározási hiba: ", error);
  },
  { enableHighAccuracy: true }
);

// Test function to simulate location changes
function testPlayAlertSound() {
  const testLocations = [
    { name: "Point A", coords: [47.4979, 19.0402], address: "Budapest", story: "Test A" },
    { name: "Point B", coords: [47.4979, 19.0403], address: "Budapest", story: "Test B" }
  ];

  // Simulate user reaching Point A
  const userCoordsA = [47.4979, 19.0402];
  locations = testLocations;
  simulateLocationChange(userCoordsA);

  // Simulate user moving away from Point A
  const userCoordsB = [47.4979, 19.0500];
  simulateLocationChange(userCoordsB);

  // Simulate user reaching Point A again
  simulateLocationChange(userCoordsA);
}

// Helper function to simulate location change
function simulateLocationChange(coords) {
  const event = {
    coords: {
      latitude: coords[0],
      longitude: coords[1]
    }
  };
  navigator.geolocation.watchPosition.success(event);
}

// Run the test
testPlayAlertSound();
