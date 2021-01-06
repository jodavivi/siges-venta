const ventaRxDao  = require('../dao/VentaRxDao'); 
const utils 	  = require('../utils/utils'); 
 
/**
 * @description Función que permite consultar las Ventas
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.consultarVentas = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
	 
		 var oFiltroPago = {};
		 oFiltroPago.iPeriodoId  	= req.query.iPeriodoId;
		 oFiltroPago.iId 	  		= req.query.iId; 
		 var consultarVentasResponse =  await ventaRxDao.consultarVentas(oFiltroPago);
		 if(consultarVentasResponse.iCode !== 1){
			throw new Error(consultarVentasResponse.iCode + "||" + consultarVentasResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarVentasResponse.oData;
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};
 