// corodenadas
const negocioCoords = [39.4699, -0.3763];

// crear mapa
const map = L.map('map').setView(negocioCoords, 13);

// cargar diseño
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

//marcador 
L.marker(negocioCoords).addTo(map)
  .bindPopup("Pixel Nova").openPopup();

// obtener ubicacion del cliente
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(pos => {
    const clienteCoords = [pos.coords.latitude, pos.coords.longitude];

    //ruta desde el cliente al negocio
    L.Routing.control({
      waypoints: [
        L.latLng(clienteCoords),
        L.latLng(negocioCoords)
      ],
      routeWhileDragging: false,
      createMarker: function () { return null; }
    }).addTo(map);

    //marcador del cliente
    L.marker(clienteCoords).addTo(map)
      .bindPopup("Tu ubicación").openPopup();

  }, () => {
    alert("No se pudo obtener tu ubicación.");
  });
} else {
  alert("Tu navegador no permite geolocalización.");
}