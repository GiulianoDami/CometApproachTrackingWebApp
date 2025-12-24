import axios from 'axios';

const NASA_API_KEY = 'YOUR_NASA_API_KEY';
const BASE_URL = 'https://api.nasa.gov/neo/rest/v1/feed';

class NasaApiService {
  async getCometData(startDate, endDate) {
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
      console.error('Error fetching data from NASA API:', error);
      throw error;
    }
  }

  async getCometTrajectory(cometId) {
    try {
      const response = await axios.get(`https://ssd-api.jpl.nasa.gov/sbdb.api.ssb`, {
        params: {
          sstr: cometId,
          format: 'json'
        }
      });
      return response.data.orbit;
    } catch (error) {
      console.error('Error fetching comet trajectory from NASA API:', error);
      throw error;
    }
  }
}

export default new NasaApiService();