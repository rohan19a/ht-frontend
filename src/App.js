import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

const defaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});


const print = (x) => {
  console.log(x);
}


const App = () => {
  const [markers, setMarkers] = useState([]);
  const [name, setName] = useState('');
  const [lat, set_lat] = useState('');
  const [lng, set_lng] = useState('');


  const handleMarkerClick = (marker) => {
    alert(`Name: ${marker.name}\nLatitude: ${marker.lat}\nLongitude: ${marker.lng}`);
  };

  const addMarker = (name, lat, lng) => {
    setMarkers((prevState) => [
      ...prevState,
      {
        name,
        lat,
        lng,
      },
    ]);
  };


  const handleMapClick = (e) => {
    if (e.latlng.lat === null || e.latlng.lng === null) {
      alert('Please enter a valid coordinate');
      return;
    }
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    setName('');
    set_lat('');
    set_lng('');
    setMarkers((prevState) => [
      ...prevState,
      {
        name,
        lat,
        lng,
      },
    ]);
    alert (`Name: ${name}\nLatitude: ${lat}\nLongitude: ${lng}`);
  };




  return (
    <div className="App">
      <div className="Form">
        <h2>Add Marker</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Coordinate (lat)"
          value={lat}
          onChange={(e) => set_lat(e.target.value)}
        />
        <input
          type="text"
          placeholder="Coordinate (lng)"
          value={lng}
          onChange={(e) => set_lng(e.target.value)}
        />
        <button onClick={handleMapClick}>Add Marker</button>
        <button onClick={() => setMarkers([])}>Clear Markers</button>
        <button onClick={() => print(markers)}>Print Markers</button>
        <button onClick={() => addMarker('Sample Marker', 37.78825, -122.4324)}>Add Sample Marker</button>
      </div>
      <MapContainer center={[37.78825, -122.4324]} zoom={13} className="Map" onClick={handleMapClick}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker, index) => (
          <Marker
  key={index}
  position={[marker.lat, marker.lng]}
  icon={defaultIcon}
>
  <Popup>{marker.name}</Popup>
</Marker>

        ))}
      </MapContainer>
    </div>
  );
};
  
export default App;
