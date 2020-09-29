const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// routes
const tripsRoutes = require('./routes/trips');

// controllers
const configController = require('./controllers/config');
const errorController = require('./controllers/errors');

app.use(bodyParser.urlencoded( {extended: false}));
app.use(configController.setHeaders);

app.use('/trips', tripsRoutes);
app.use(errorController.get404);

app.listen(8000);
