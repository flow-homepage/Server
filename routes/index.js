const express = require('express');
const controllers = require('../controllers/api.controller');
const validate = require('../middleware/validate');

const router = express.Router();

/* GET root */
router.get('/', (req, res) => {
  res.send('Flow Server');
});

router.post('/api/users/signup', controllers.postUser);
router.post('/api/users/login', controllers.postUserAuthentication);
router.delete('/api/users/logout', validate, controllers.deleteSession);
router.delete('/api/users/logout/all', validate, controllers.deleteAllSessions);

router.use('/api/weather', controllers.getWeather);
router.use('/api/background', controllers.getBackground);
router.use('/api/location', controllers.getLocation);

module.exports = router;
