const axios = require('axios');

const getWeather = (req, res) => {
  axios.get(`https://api.darksky.net/forecast/${process.env.DARKSKYKEY}/34.0522,-118.2436`)
    .then(request => res.json(request.data.currently))
  // todo: more robust error handling
    .catch(err => console.error(err));
};

module.exports = {
  getWeather
};