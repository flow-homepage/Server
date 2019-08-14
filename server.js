require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./routes/index');

const app = express();
app.use(cors());

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);


// error handler goes here

app.listen(process.env.PORT || 5500, () => {
  console.log(`Server listening on PORT ${process.env.PORT || 5500}`);
});
