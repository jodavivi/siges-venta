const utils 	 = require('../utils/utils'); 
const ventaTxDao = require('../dao/VentaTxDao'); 
const ventaEstadoTxDao = require('../dao/VentaEstadoTxDao');   
const ventaPagoTxDao = require('../dao/VentaPagoTxDao');   

/**
 * @description Función que permite registrar las ventas
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.registrarVenta = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req); 
		 var oRegistroVenta = {};
		 oRegistroVenta.oAuditRequest  = oRequest.oAuditRequest;
		 oRegistroVenta.oData		  = oRequest.oData; 
		 if(oRegistroVenta.oData.sClienteNroIdentificacion === undefined ||
			oRegistroVenta.oData.sClienteNroIdentificacion === null ||
			oRegistroVenta.oData.sClienteNroIdentificacion === ""){
				oRegistroVenta.oData.sClienteNroIdentificacion = "00000000";
				oRegistroVenta.oData.sClienteRazonSocial		= "Varios";
	 	}
		 const crearVentaResponse 	  = await  ventaTxDao.crearVenta(oRegistroVenta);
		 if(crearVentaResponse.iCode !== 1){
			throw new Error(crearVentaResponse.iCode + "||" + crearVentaResponse.sMessage);
		 } 
		 var oVenta = crearVentaResponse.oData;

		 // Registramos el pago de la venta
		 if(oRequest.oData.aVentaPago && oRequest.oData.aVentaPago.length > 0){
			oRequest.oData.aVentaPago.forEach(async function(e){
				var oRegistroVentaPago = {};
				oRegistroVentaPago.oAuditRequest    = oRequest.oAuditRequest;
				oRegistroVentaPago.oData		    = e; 
				oRegistroVentaPago.oData.iVentaId   = oVenta.Id;
				const crearVentaPagoResponse = await  ventaPagoTxDao.crearVentaPago(oRegistroVentaPago);
				if(crearVentaPagoResponse.iCode !== 1){
					throw new Error(crearVentaPagoResponse.iCode + "||" + crearVentaPagoResponse.sMessage);
				} 
			});
			
		 } 
		 //Registramos el estado del documento
		 var oRegistroVentaEstado = {};
		 oRegistroVentaEstado.oAuditRequest  = oRequest.oAuditRequest;
		 oRegistroVentaEstado.oData		  = {}; 
		 oRegistroVentaEstado.oData.iVentaId 	= oVenta.Id;
		 oRegistroVentaEstado.oData.iCodEstado = 1;
		 oRegistroVentaEstado.oData.sEstado 	= "Emitido";
		 const crearVentaEstadoResponse = await  ventaEstadoTxDao.crearVentaEstado(oRegistroVentaEstado);
		 if(crearVentaEstadoResponse.iCode !== 1){
			throw new Error(crearVentaEstadoResponse.iCode + "||" + crearVentaEstadoResponse.sMessage);
		 }

     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= oVenta;
		
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


/**
 * @description Función que permite actualizar venta
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.actualizarVenta = async (req, res) => { 
	var oResponse		 = {};
	oResponse.oData		 = {};
	var oRequest		 = null;
	try { 
		oRequest		 = utils.customRequest(req);
		//actualizamos Compra
		var oRegistro = {};
		oRegistro.oAuditRequest  = oRequest.oAuditRequest;
		oRegistro.oData		     = oRequest.oData; 
		oRegistro.oData.iId	     = parseInt(req.params.id, 10); 
		const actualizarVentaResponse = await  ventaTxDao.actualizarVenta(oRegistro);
		if(actualizarVentaResponse.iCode !== 1){
		   throw new Error(actualizarVentaResponse.iCode + "||" + actualizarVentaResponse.sMessage);
		}
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
		oResponse.oData			= actualizarVentaResponse.oData; 
	   
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

/**
 * @description Función que permite eliminar Venta
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.eliminarVenta = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {};
	var oRequest			= null;
	try {
		oRequest		 = utils.customRequest(req);
	 
		oRequest.oData.aItems.forEach(async function(e){
			var oRegistro = {};
			oRegistro.oAuditRequest  = oRequest.oAuditRequest;
			oRegistro.oData		  	 = {}; 
			oRegistro.oData.iId	  	 = parseInt(e, 10); 
			const eliminarVentaResponse = await  ventaTxDao.eliminarVenta(oRegistro);
			if(eliminarVentaResponse.iCode !== 1){
				throw new Error(eliminarVentaResponse.iCode + "||" + eliminarVentaResponse.sMessage);
			} 
		});
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

