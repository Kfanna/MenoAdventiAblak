
// Cseréld ki userCoords=[position.coords.latitude, position.coords.longitude]

// Felhasználó helyének figyelése
function watchUserLocation(map) {
  navigator.geolocation.watchPosition(
    (position) => {
      const userCoords = [47.43260325377274, 19.161763139117895];
      const userMarker = L.marker(userCoords).addTo(map).bindPopup("Ez a te helyed!").openPopup();
      map.setView(userCoords, 14); // Fókusz a felhasználó helyére
    },
    (error) => {
      console.error("Helymeghatározási hiba:", error);
    },
    {
    enableHighAccuracy: true, // Kapcsolja be a pontos helymeghatározást
    timeout: 10000,          // Legfeljebb 10 másodpercig várjon
    maximumAge: 0            // Ne használjon gyorsítótárazott adatokat
  }
  );
}

  

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
