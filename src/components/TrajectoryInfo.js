import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrajectoryInfo = () => {
  const [trajectoryData, setTrajectoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-01-01&end_date=2023-01-07&api_key=DEMO_KEY');
        setTrajectoryData(response.data.near_earth_objects);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div>
      <h2>Comet Trajectory Information</h2>
      {Object.keys(trajectoryData).map((date) => (
        <div key={date}>
          <h3>{date}</h3>
          <ul>
            {trajectoryData[date].map((comet) => (
              <li key={comet.id}>
                <strong>Name:</strong> {comet.name} <br />
                <strong>Closest Approach Date:</strong> {comet.close_approach_data[0].close_approach_date_full} <br />
                <strong>Miss Distance (km):</strong> {comet.close_approach_data[0].miss_distance.kilometers}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TrajectoryInfo;