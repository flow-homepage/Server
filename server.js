const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(indexRouter);


// error handler goes here

app.listen(5000 || 5500, () => {
  console.log(`Server listening on PORT ${5000 || 5500}`);
});
