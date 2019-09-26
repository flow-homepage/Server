const express = require('express');
const controllers = require('../controllers/api.controller');

const router = express.Router();

/* GET root */
router.get('/', (req, res) => {
  res.send('Flow Server');
});

router.post('/api/users', controllers.postUser);
router.get('/api/users', controllers.getUserAuthentication);

router.use('/api/weather', controllers.getWeather);
router.use('/api/background', controllers.getBackground);

module.exports = router;
