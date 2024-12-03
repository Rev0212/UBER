const axios = require('axios')

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports.calculateDistance = async (origin,destination) => { 

    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url =`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.rows; 
        } else {
            throw new Error('Unable to fetch distance');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};


module.exports.getSuggestions = async (place) => {
    try {
      const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  
      if (!apiKey) {
        throw new Error('Google Maps API key is missing in environment variables.');
      }
  
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(place)}&key=${apiKey}`;
      const response = await axios.get(url);
  
      if (response.data.status === 'OK') {
        return response.data;
      } else {
        console.error(`Google Maps API error: ${response.data.status}`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error.message);
      return null;
    }
  };



