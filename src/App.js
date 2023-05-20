import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
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

const pushtoDB = () => {
}


const print = (x) => {
  console.log(x);
}


const App = () => {
  const [markers, setMarkers] = useState([]);
  const [name, setName] = useState('');
  const [lat, setLat] = useState(''); // Update variable name to setLat
  const [lng, setLng] = useState(''); // Update variable name to setLng


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
    setName('');
    setLat('');
    setLng('');

  };

  
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    //make an alert with a confirm to add a marker and a box to enter the name
    

    //add the lat and lng to the form inputs called lat and lng
    setLat(lat);
    setLng(lng);


  };

  // Custom hook to attach the click event to the map
  const MapClickEvent = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
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
        <button onClick={() => pushtoDB()}>Upload New Events</button>
      </div>
      <MapContainer center={[37.78825, -122.4324]} zoom={13} className="Map">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickEvent />
     {markers.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.lat, marker.lng]}
            icon={defaultIcon}
          >
  <Popup>{marker.name + "\n" + marker.lat + marker.lng}</Popup>
</Marker>
        ))}
      </MapContainer>
    </div>
  );
};
  
export default App;
