const utils 	 = require('../utils/utils');  
const ventaEstadoTxDao = require('../dao/VentaEstadoTxDao');   

/**
 * @description Función que permite registrar el estado de la venta
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.registrarVentaEstado = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req); 
		 var oEmpresa =  oRequest.oAuditRequest.oEmpresa; 
		 //Registramos el estado del documento
		 var oRegistroVentaEstado = {};
		 oRegistroVentaEstado.oAuditRequest  = oRequest.oAuditRequest;
		 oRegistroVentaEstado.oData		  = {}; 
		 oRegistroVentaEstado.oData.iVentaId 	= oRequest.oData.iVentaId;
		 oRegistroVentaEstado.oData.iCodEstado = oRequest.oData.iCodEstado;
		 oRegistroVentaEstado.oData.sEstado 	= oRequest.oData.sEstado;
		 const crearVentaEstadoResponse = await  ventaEstadoTxDao.crearVentaEstado(oRegistroVentaEstado);
		 if(crearVentaEstadoResponse.iCode !== 1){
			throw new Error(crearVentaEstadoResponse.iCode + "||" + crearVentaEstadoResponse.sMessage);
		 }

     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK'; 
		
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
		oResponse.oData	= oRequest.oData;
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};
