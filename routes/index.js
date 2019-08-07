const express = require('express');
const router = express.Router();

/* GET root */
router.get('/', (req, res, next) => {
res.send('Flow Server')
});

router.use('/api', require('./api'));

module.exports = router;
