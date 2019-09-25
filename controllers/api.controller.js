const axios = require('axios');
const users = require('../models/users.model');

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

exports.postUser = async (req, res) => {
  try {
    const cookie = await users.add(req.body);
    return res.status(201).send(cookie);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.postUserAuthentication = async (req, res) => {
  try {
    const cookie = await users.authenticate(req.body);
    return res.status(201).send(cookie);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteSession = async (req, res) => {
  try {
    await users.logout(req.body);
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteAllSessions = async (req, res) => {
  try {
    await users.logoutAll(req.body);
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
