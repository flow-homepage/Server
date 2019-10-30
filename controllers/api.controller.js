const axios = require('axios');
const users = require('../models/users.model');


/**
 * Google Reverse Geocoding API call
 * @param {Object} req
 * @param {Object} res
 */
exports.getLocation = (req, res) => {
  axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${process.env.LOCATIONKEY}&lat=${req.query.lat}&lon=${req.query.lng}&format=json&addressdetails=1`)
    .then(request => res.json(request.data.address.city))
    .catch(err => {
      console.error(err);
      res.status(500).send('Server Error');
    });
};

/**
 * Darksky API call for current weather
 * @param {Object} req
 * @param {Object} res
 */
exports.getWeather = (req, res) => {
  axios
    .get(
      `https://api.darksky.net/forecast/${process.env.DARKSKYKEY}/${req.params.lat},${req.params.lng}`
    )
    .then(request => res.json(request.data.currently))
    // TODO: more robust error handling
    .catch(err => {
      console.error(err);
      res.status(500).send('Server Error');
    });
};

/**
 * API call for background images
 * @param {Object} req
 * @param {Object} res
 */
exports.getBackground = (req, res) => {
  axios
    .get(
      `https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASHKEY}&orientation=landscape&query=beach`
    )
    .then(request => res.send(request.data))
    .catch(err => {
      console.error('Error happened during fetching!', err);
      res.status(500).send('Server Error');
    });
};

/**
 * Create User
 * @param {Object} req
 * @param {Object} res
 */
exports.postUser = async (req, res) => {
  try {
    const cookie = await users.add(req.body);
    return res.status(201).send(cookie);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

/**
 * Create User Authentication
 * @param {Object} req
 * @param {Object} res
 */
exports.postUserAuthentication = async (req, res) => {
  try {
    const cookie = await users.authenticate(req.body);
    return res.status(201).send(cookie);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

/**
 * Delete one user session
 * @param {Object} req
 * @param {Object} res
 */
exports.deleteSession = async (req, res) => {
  try {
    await users.logout(req.body);
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

/**
 * Delete all user sessions
 * @param {Object} req
 * @param {Object} res
 */
exports.deleteAllSessions = async (req, res) => {
  try {
    await users.logoutAll(req.body);
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
