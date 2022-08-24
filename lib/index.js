const express = require('express');
const routes = require('./routes'); 
const bodyParser = require('body-parser'); 
const log4js = require("log4js");
const config = require('./config/entorno.js'); 
const utils = require('./utils/utils');
const cors = require('cors');

//Crear Conexion a BD
const db = require('./config/db');

//importal modelo
require('./modelBd/entity/Venta'); 
require('./modelBd/entity/VentaEstado'); 
require('./modelBd/entity/VentaPago'); 

//Arrancar BD y creacion de tablas
db.sync()
    .then(()=> console.log('Conectado al Servidor'))
    .catch(error => console.log(error));

//crea un app de express
const app = express();

log4js.configure({
    appenders: {
      siges_venta: {
        type: "dateFile",
        filename: "./log/siges-venta.log",
        pattern: "yyyy-MM-dd",
        compress: true,
      },
    },
    categories: {
      default: { appenders: ["siges_venta"], level: "debug" },
    },
  });
  
app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
 

//uso de mildware 
app.use((req, res, next) => { 
    var oValidaDatosAuditoria  = utils.validaDatosAuditoria(req.headers);
      if(oValidaDatosAuditoria.iCode === 1){
          next();
      }else{
          res.status(406).send({
              error: oValidaDatosAuditoria.sMessage
            });
            return;
      }
      
  });

//Inicia Routes
app.use('/venta', routes());
 
//Servidor y puerto
const host = config.HOST;
const port = config.PORT; 
const logger = log4js.getLogger("siges_venta"); 

app.listen(port, host, () => {
    console.log('Servidor funcionando correctamente en el puerto: ' + port);
    logger.debug('Servidor funcionando correctamente en el puerto: ' + port); 
});