// Térkép inicializálása

function initializeMap() {
  const map = L.map('map').setView([47.433657, 19.159633], 15.2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  return map;
}

// Térkép létrehozása és geolokáció figyelése
const map = initializeMap();
watchUserLocation(map);


// Egyedi ikon definiálása
const customIcon = L.icon({
  iconUrl: 'images/custom-icon.png', // Az ikon elérési útvonala
  iconSize: [32, 32],               // Ikon mérete (szélesség, magasság)
  iconAnchor: [16, 32],             // Ikon horgonya (ahonnan az ikon "érintkezik" a térképpel)
  popupAnchor: [0, -32]             // A popup pozíciója az ikonhoz képest
});


// Helyszínek hozzáadása a térképhez, dátum alapján
locations.forEach(location => {
  if (location.showOnDay <= currentDay) { // Csak az aktuális napig megjelenő ablakok
    const marker = L.marker(location.coords, { icon: customIcon }).addTo(map);
    marker.bindPopup(`
      <b>${location.name}</b><br>
      ${location.address}<br><br>
      <i>${location.story}</i>
    `).openPopup();
  }
});