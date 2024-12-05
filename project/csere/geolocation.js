
// Egyedi marker ikon (opcionális)
const userIcon = L.icon({
  iconUrl: 'images/me-icon.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Felhasználó marker inicializálása
let userMarker = L.marker([47.445, 19.135], { icon: userIcon }).addTo(map);
userMarker.bindPopup('Ez a szimulált helyed!');

// Kezdeti koordináták
let simulatedCoords = [47.445, 19.135];

// Automatikus mozgás szimuláció
setInterval(() => {
  // Mozgasd a koordinátákat "séta" szimulálásához
  simulatedCoords[0] += 0.0001; // Északra mozgás
  simulatedCoords[1] += 0.0001; // Keletre mozgás

  // Frissítsd a marker pozícióját a térképen
  userMarker.setLatLng(simulatedCoords);
  userMarker.getPopup().setContent(`Szimulált pozíció: ${simulatedCoords[0].toFixed(6)}, ${simulatedCoords[1].toFixed(6)}`);
  console.log("Új szimulált helyzet:", simulatedCoords);

  // Távolság számítása minden helyszínhez
  locations.forEach(location => {
    const distance = calculateDistance(simulatedCoords, location.coords);
    if (distance <= 5) {
      console.log(`Közel vagy a(z) ${location.name} helyhez! Távolság: ${distance.toFixed(2)}m`);

      // Popup megjelenítése
      L.popup()
        .setLatLng(location.coords)
        .setContent(`
          <h3>${location.name}</h3>
          <p><strong>Cím:</strong> ${location.address}</p>
          <p>${location.story}</p>
        `)
        .openOn(map);
    }
  });
}, 2000); // 2 másodpercenként frissít
