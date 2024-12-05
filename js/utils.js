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

          // Popup megjelenítése
          const marker = L.marker(location.coords, { icon: customIcon }).addTo(map);
          marker.bindPopup(`
            <div style="font-family: 'Arial', sans-serif; line-height: 1.6; max-width: 300px;">
              <h3 style="color: #6BA3BE;">${location.name}</h3>
              <p><strong>Cím:</strong> ${location.address}</p>
              <p style="font-style: italic;">${location.story}</p>
            </div>
          `).openPopup();
        }
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

// Távolság számítás függvénye
function calculateDistance(coords1, coords2) {
  const R = 6371e3; // Föld sugara méterben
  const lat1 = coords1[0] * Math.PI / 180;
  const lat2 = coords2[0] * Math.PI / 180;
  const deltaLat = (coords2[0] - coords1[0]) * Math.PI / 180;
  const deltaLon = (coords2[1] - coords1[1]) * Math.PI / 180;

  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Távolság méterben
}
