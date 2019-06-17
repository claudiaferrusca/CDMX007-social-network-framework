const express = require('express');
const bodyParser = require('body-parser');
const app = express()

// Cargar Rutas
const user_routes = require('./routes/user')
const follow_routes = require('./routes/follow')
const publication_routes = require('./routes/publication')

//middlewares---poder usar Json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors

// rutas
app.use('/api', user_routes);
app.use('/api', follow_routes);
app.use('/api', publication_routes);

//export
module.exports = app;

