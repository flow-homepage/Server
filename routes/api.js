const router = require('express').Router();
const controllers = require('../controllers/api.controller');

// weather
router.get('/weather', controllers.getWeather);
