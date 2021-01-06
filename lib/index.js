const express = require('express');
const routes = require('./routes');
const path  = require('path');
const bodyParser = require('body-parser');
//extraer valores de variables.env
require('dotenv').config({path:'variables.env'});

//Crear Conexion a BD
const db = require('./config/db');

//importal modelo
require('./modelBd/entity/Venta'); 

//Arrancar BD y creacion de tablas
db.sync()
    .then(()=> console.log('Conectado al Servidor'))
    .catch(error => console.log(error));

//crea un app de express
const app = express();

app.use((req, res, next) => {
    console.log('Middleware 1');
    next();
});
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
 

//uso de mildware
app.use((req, res, next) => {
    next();
});

//Inicia Routes
app.use('/venta', routes());
 
//Servidor y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3024;

app.listen(port, host, () => {
    console.log('Servidor funcionando correctamente en el puerto: ' + port);
});