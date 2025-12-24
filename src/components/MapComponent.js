import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ trajectoryData }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    trajectoryData.forEach(point => {
      L.circleMarker([point.latitude, point.longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 8
      }).addTo(mapRef.current)
        .bindPopup(`Date: ${point.date}<br>Distance from Earth: ${point.distance} km`);
    });

    return () => {
      mapRef.current.remove();
    };
  }, [trajectoryData]);

  return <div id="map" style={{ height: '600px' }}></div>;
};

export default MapComponent;