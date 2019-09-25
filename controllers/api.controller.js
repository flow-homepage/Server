const axios = require('axios');
/**
 * Darksky API call for current weather
 * @param {Object} req
 * @param {Object} res
 */
const getWeather = (req, res) => {
  axios
    .get(
      `https://api.darksky.net/forecast/${process.env.DARKSKYKEY}/${req.params.lat},${req.params.lng}`
    )
    .then(request => res.json(request.data.currently))
    // TODO: more robust error handling
    .catch(err => console.error(err));
};

const getBackground = (req, res) => {
  axios
    .get(
      `https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASHKEY}&orientation=landscape&query=beach`
    )
    .then(request => res.send(request.data.urls.regular))
    .catch(err => {
      console.log('Error happened during fetching!', err);
    });
};
module.exports = {
  getWeather,
  getBackground,
};
