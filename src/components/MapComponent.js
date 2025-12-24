import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ trajectoryData }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }

    if (trajectoryData && trajectoryData.length > 0) {
      const latLngs = trajectoryData.map(point => [point.latitude, point.longitude]);
      const polyline = L.polyline(latLngs, { color: 'red' }).addTo(mapRef.current);
      mapRef.current.fitBounds(polyline.getBounds());
    }
  }, [trajectoryData]);

  return <div id="map" style={{ height: '500px', width: '100%' }} />;
};

export default MapComponent;