const express = require('express');

const router = express.Router();
const controllers = require('../controllers/api.controller');

/* GET root */
router.get('/', (req, res) => {
  res.send('Flow Server');
});

router.use('/api/weather', controllers.getWeather);
router.use('/api/background', controllers.getBackground);

module.exports = router;
