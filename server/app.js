const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// routes
const mapsRoutes = require('./routes/maps');
const dashboardRoutes = require('./routes/dashboard');
// const creatorRoutes = require('./routes/creator');

// controllers
const configController = require('./controllers/config');
const errorController = require('./controllers/errors');

app.use(bodyParser.urlencoded({extended:true}));
app.use(configController.setHeaders);

app.use('/api/p', mapsRoutes);
app.use('/api/dashboard', dashboardRoutes);
// app.use('/api', creatorRoutes);
// app.use('/api', dashboardRoutes);

app.use(errorController.get404);

app.listen(8000);
