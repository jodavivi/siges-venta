const express = require('express');
const router = express.Router();

const ventaRxBusiness        = require('../business/VentaRxBusiness');  
const ventaTxBusiness        = require('../business/VentaTxBusiness');  

module.exports = function(){

    //venta
    router.post('/', ventaTxBusiness.registrarVenta); 
    router.put('/:id', ventaTxBusiness.actualizarVenta); 
    router.delete('/', ventaTxBusiness.eliminarVenta);  
    router.get('/', ventaRxBusiness.consultarVentas); 
 
    return router;
}

