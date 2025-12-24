import axios from 'axios';

const NASA_API_KEY = 'YOUR_NASA_API_KEY'; // Replace with your actual NASA API key
const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/feed';

export const fetchCometData = async (startDate, endDate) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        start_date: startDate,
        end_date: endDate,
        api_key: NASA_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching comet data:', error);
    throw error;
  }
};

export const fetchCometTrajectory = async (cometId) => {
  try {
    const response = await axios.get(`https://ssd-api.jpl.nasa.gov/sbdb.api.ssb`, {
      params: {
        sstr: cometId,
        format: 'json',
        cov: 'y'
      }
    });
    return response.data.orbit;
  } catch (error) {
    console.error('Error fetching comet trajectory:', error);
    throw error;
  }
};