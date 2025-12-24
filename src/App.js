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
        // Assuming the API returns data in a format that includes comet positions
        const data = response.data.near_earth_objects;
        const firstComet = Object.values(data)[0][0];
        const coordinates = firstComet.close_approach_data[0].miss_distance.kilometers;
        setPosition([parseFloat(coordinates), parseFloat(coordinates)]);
        setCometData(firstComet);
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Comet Approach Tracking WebApp</h1>
      </header>
      <MapContainer center={position} zoom={5} style={{ height: "80vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {cometData && (
          <Marker position={position}>
            <Popup>
              Comet Name: {cometData.name}<br />
              Distance from Earth: {cometData.close_approach_data[0].miss_distance.kilometers} km
            </Popup>
          </Marker>
        )}
      </MapContainer>
      <footer>
        <p>Data provided by NASA's APIs</p>
      </footer>
    </div>
  );
}

export default App;