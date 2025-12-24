import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  const [cometData, setCometData] = useState(null);
  const [position, setPosition] = useState([51.505, -0.09]);

  useEffect(() => {
    axios.get('https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-01-01&end_date=2023-01-07&api_key=DEMO_KEY')
      .then(response => {
        // Assuming the API returns data in a format that includes comet position
        const data = response.data.near_earth_objects;
        const firstComet = Object.values(data)[0][0];
        if (firstComet) {
          const { latitude, longitude } = firstComet.close_approach_data[0].miss_distance;
          setPosition([parseFloat(latitude), parseFloat(longitude)]);
          setCometData(firstComet);
        }
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div className="App">
      <h1>Comet Approach Tracking WebApp</h1>
      {cometData && (
        <div>
          <p>Name: {cometData.name}</p>
          <p>Distance from Earth: {cometData.close_approach_data[0].miss_distance.kilometers} km</p>
        </div>
      )}
      <MapContainer center={position} zoom={3} style={{ height: "50vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A mysterious comet!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;