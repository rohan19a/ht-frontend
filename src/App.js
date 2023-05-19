import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import { get } from 'mongoose';

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

const getMarkers = () => {
  //make a request to the backend to get the markers
  get('/api/markers')
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};


const addtoDB = (name, lat, lng) => {
  // Simple POST request with a JSON body using fetch
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'api/add' },
      body: JSON.stringify({name: name, lat: lat, lng: lng})
  };
  fetch('/api/add', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ postId: data.id }));
}


const print = (x) => {
  console.log(x);
}


const App = () => {
  const [markers, setMarkers] = useState([]);
  const [name, setName] = useState('');
  const [lat, setLat] = useState(''); // Update variable name to setLat
  const [lng, setLng] = useState(''); // Update variable name to setLng
  


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


  const handleButtonClick = () => {
    addMarker(name, lat, lng);
  };

  const handleMapClick = () => {
    alert('Map clicked');
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
          placeholder="lat" // Update placeholder to "lat"
          value={lat}
          onChange={e => setLat(e.target.value)} // Update setter function to setLat
        />
        <input
          type="text"
          placeholder="lng"
          value={lng}
          onChange={e => setLng(e.target.value)}
        />
        <button onClick={handleButtonClick}>Add Marker</button>
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
  <Popup>{marker.name + marker.lat + marker.lng}</Popup>
</Marker>
        ))}
      </MapContainer>
    </div>
  );
};
  
export default App;
