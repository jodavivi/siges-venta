const utils 	 = require('../utils/utils'); 
const ventaTxDao = require('../dao/VentaTxDao'); 
const ventaRxDao = require('../dao/VentaRxDao'); 
const ventaEstadoTxDao = require('../dao/VentaEstadoTxDao');  
const ventaEstadoRxDao = require('../dao/VentaEstadoRxDao'); 
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
		 var oEmpresa =  oRequest.oAuditRequest.oEmpresa;

		 //Consultamos la venta
		 var oFiltroVenta = {};
		 oFiltroVenta.sCodEmpresa = oEmpresa.CodEmpresa;
		 oFiltroVenta.sCodPedido  = oRequest.oData.sCodPedido;
		 const consultarVentasResponse = await ventaRxDao.consultarVentas(oFiltroVenta);
		 if(consultarVentasResponse.iCode < 1){
			throw new Error(consultarVentasResponse.iCode + "||" + consultarVentasResponse.sMessage);
		 } 
		 
		 if(consultarVentasResponse.iCode === 1){
			var oVenta = consultarVentasResponse.oData[0];
			//Venta Anulada (1)
			if(oVenta.CodEstado !== 2){
				throw new Error(103 + "||" + "Ya existe una venta con el mismo pedido");
			}
		 } 
		 var oRegistroVenta = {};
		 oRegistroVenta.oAuditRequest  = oRequest.oAuditRequest;
		 oRegistroVenta.oData		  = oRequest.oData; 
		 oRegistroVenta.oData.sCodEmpresa  = oEmpresa.CodEmpresa;
		 oRegistroVenta.oData.sEmpresa  = oEmpresa.RazonSocial;
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
		var oEmpresa =  oRequest.oAuditRequest.oEmpresa;
		//Consultamos el estado
		var oFiltroDoc = {};
		oFiltroDoc.sCodEmpresa = oEmpresa.CodEmpresa;
		oFiltroDoc.iVentaId =  parseInt(req.params.id, 10); 
		const consultarVentaEstadoActualResponse = await ventaEstadoRxDao.consultarVentaEstadoActual(oFiltroDoc);
		if(consultarVentaEstadoActualResponse.iCode !== 1){
			throw new Error(consultarVentaEstadoActualResponse.iCode + "||" + consultarVentaEstadoActualResponse.sMessage);
		 } 
		 var oDocventaEstado = consultarVentaEstadoActualResponse.oData[0];
		//actualizamos venta
		var oRegistro = {};
		oRegistro.oAuditRequest  = oRequest.oAuditRequest;
		oRegistro.oData		     = oRequest.oData; 
		oRegistro.oData.iId	     = parseInt(req.params.id, 10); 
		const actualizarVentaResponse = await  ventaTxDao.actualizarVenta(oRegistro);
		if(actualizarVentaResponse.iCode !== 1){
		   throw new Error(actualizarVentaResponse.iCode + "||" + actualizarVentaResponse.sMessage);
		}

		//Actualizamos el detalle del pago
		if(oRequest.oData.aVentaPago && oRequest.oData.aVentaPago.length > 0){
			oRequest.oData.aVentaPago.forEach(async function(e){
				if(e.sAccion === "C"){
					var oRegistroVentaPago = {};
					oRegistroVentaPago.oAuditRequest    = oRequest.oAuditRequest;
					oRegistroVentaPago.oData		    = e; 
					oRegistroVentaPago.oData.iVentaId   = parseInt(req.params.id, 10); 
					const crearVentaPagoResponse = await  ventaPagoTxDao.crearVentaPago(oRegistroVentaPago);
					if(crearVentaPagoResponse.iCode !== 1){
						throw new Error(crearVentaPagoResponse.iCode + "||" + crearVentaPagoResponse.sMessage);
					} 
				}
				if(e.sAccion === "U"){
					var oRegistroVentaPago = {};
					oRegistroVentaPago.oAuditRequest    = oRequest.oAuditRequest;
					oRegistroVentaPago.oData		    = e; 
					oRegistroVentaPago.oData.iVentaId   = parseInt(req.params.id, 10); 
					const actualizarVentaPagoResponse = await  ventaPagoTxDao.actualizarVentaPago(oRegistroVentaPago);
					if(actualizarVentaPagoResponse.iCode !== 1){
						throw new Error(actualizarVentaPagoResponse.iCode + "||" + actualizarVentaPagoResponse.sMessage);
					} 
				}
				if(e.sAccion === "D"){
					var oRegistroVentaPago = {};
					oRegistroVentaPago.oAuditRequest    = oRequest.oAuditRequest;
					oRegistroVentaPago.oData		    = e; 
					oRegistroVentaPago.oData.iVentaId   = parseInt(req.params.id, 10); 
					const eliminarVentaPagoResponse = await  ventaPagoTxDao.eliminarVentaPago(oRegistroVentaPago);
					if(eliminarVentaPagoResponse.iCode !== 1){
						throw new Error(eliminarVentaPagoResponse.iCode + "||" + eliminarVentaPagoResponse.sMessage);
					} 
				}
			});
			
		 } 

		 if(oDocventaEstado.CodEstado !== oRequest.oData.iCodEstado){
			var oRegistroVentaEstado = {};
			oRegistroVentaEstado.oAuditRequest  = oRequest.oAuditRequest;
			oRegistroVentaEstado.oData		  = {}; 
			oRegistroVentaEstado.oData.iVentaId 	= parseInt(req.params.id, 10); 
			oRegistroVentaEstado.oData.iCodEstado 	= oRequest.oData.iCodEstado;
			oRegistroVentaEstado.oData.sEstado 		= oRequest.oData.sEstado;
			const crearVentaEstadoResponse = await  ventaEstadoTxDao.crearVentaEstado(oRegistroVentaEstado);
			if(crearVentaEstadoResponse.iCode !== 1){
			   throw new Error(crearVentaEstadoResponse.iCode + "||" + crearVentaEstadoResponse.sMessage);
			}
   
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
			//Eliminamos la venta
			var oRegistro = {};
			oRegistro.oAuditRequest  = oRequest.oAuditRequest;
			oRegistro.oData		  	 = {}; 
			oRegistro.oData.iId	  	 = parseInt(e, 10); 
			const eliminarVentaResponse = await  ventaTxDao.eliminarVenta(oRegistro);
			if(eliminarVentaResponse.iCode !== 1){
				throw new Error(eliminarVentaResponse.iCode + "||" + eliminarVentaResponse.sMessage);
			} 
			//Eliminamos los pagos
			var oRegistroVentaPago = {};
			oRegistroVentaPago.oAuditRequest    = oRequest.oAuditRequest;
			oRegistroVentaPago.oData		    = {}; 
			oRegistroVentaPago.oData.iVentaId   = parseInt(e, 10); 
			const eliminarVentaPagoResponse = await  ventaPagoTxDao.eliminarVentaPago(oRegistroVentaPago);
			if(eliminarVentaPagoResponse.iCode !== 1){
				throw new Error(eliminarVentaPagoResponse.iCode + "||" + eliminarVentaPagoResponse.sMessage);
			} 

			//Eliminamos los estados 
			var oRegistroVentaEstado = {};
			oRegistroVentaEstado.oAuditRequest  = oRequest.oAuditRequest;
			oRegistroVentaEstado.oData		  = {}; 
			oRegistroVentaEstado.oData.iVentaId 	= parseInt(e, 10);  
			const eliminarVentaEstadoResponse = await  ventaEstadoTxDao.eliminarVentaEstado(oRegistroVentaEstado);
			if(eliminarVentaEstadoResponse.iCode !== 1){
			   throw new Error(eliminarVentaEstadoResponse.iCode + "||" + eliminarVentaEstadoResponse.sMessage);
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

