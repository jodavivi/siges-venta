const ventaPago     = require('../modelBd/entity/VentaPago'); 
const utilsDao  = require('./utils/utils'); 
const utilsGen  = require('../utils/utils'); 
const config    = require('../config/config.json');  

/**
 * @description Función que permite registrar los pagos de la venta
 * @creation David Villanueva 24/08/2022
 * @update
 */
exports.crearVentaPago = async function (oParam) { 
    const oResponse = {};
    try {
        var seqVentaPago = "'" +config.seqVentaPago +"'";
        var seq = await utilsDao.obtenetSequencia(seqVentaPago);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id                = parseInt(seq.oData, 10);
        oRegistro.EstadoId          = 1;
        oRegistro.UsuarioCreador    = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion     = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion  = oParam.oAuditRequest.sTerminal; 
        
        oRegistro.VentaId         = oParam.oData.iVentaId;
        oRegistro.Item            = oParam.oData.iItem;
        oRegistro.CodFormaPago    = oParam.oData.sCodFormaPago;
        oRegistro.FormaPago       = oParam.oData.sFormaPago;
        oRegistro.CodBanco        = oParam.oData.sCodBanco;
        oRegistro.Banco           = oParam.oData.sBanco;  
        oRegistro.NumTarjeta      = oParam.oData.sNumTarjeta; 
        oRegistro.NumOperacion    = oParam.oData.sNumOperacion;
        oRegistro.Moneda          = oParam.oData.sMoneda;
        oRegistro.Importe           = oParam.oData.fImporte;  
        oRegistro.ImporteTotal  = oParam.oData.fImporteTotal;  

        const crearRegistroPromise = await ventaPago.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: venta_pago, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}


/**
 * @description Función que permite actualizar los pagos de la venta
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.actualizarVentaPago = async function (oParam) { 
    const oResponse = {};
    try {
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        
         
        if(oParam.oData.iItem !== undefined){
            oRegistro.Item     = oParam.oData.iItem; 
        }

        if(oParam.oData.sCodFormaPago !== undefined){
            oRegistro.CodFormaPago     = oParam.oData.sCodFormaPago; 
        } 
        if(oParam.oData.sFormaPago !== undefined){
            oRegistro.FormaPago     = oParam.oData.sFormaPago; 
        }
        if(oParam.oData.sCodBanco !== undefined){
            oRegistro.CodBanco     = oParam.oData.sCodBanco; 
        }
        if(oParam.oData.sBanco !== undefined){
            oRegistro.Banco     = oParam.oData.sBanco; 
        }
        if(oParam.oData.sNumTarjeta !== undefined){
            oRegistro.NumTarjeta     = oParam.oData.sNumTarjeta; 
        }
        if(oParam.oData.sNumOperacion !== undefined){
            oRegistro.NumOperacion     = oParam.oData.sNumOperacion; 
        }
        if(oParam.oData.sMoneda !== undefined){
            oRegistro.Moneda     = oParam.oData.sMoneda; 
        }
        if(oParam.oData.fImporte !== undefined){
            oRegistro.Importe     = oParam.oData.fImporte; 
        }
        if(oParam.oData.fImporteTotal !== undefined){
            oRegistro.ImporteTotal     = oParam.oData.fImporteTotal; 
        }
         
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        oFiltro.where.VentaId = oParam.oData.iVentaId;
        const acrualizarRegistroPromise = await ventaPago.update(oRegistro, oFiltro);

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: venta_pago, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar los pagos de la venta
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.eliminarVentaPago = async function (oParam) { 
    const oResponse = {};
    try {
 
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        oRegistro.EstadoId             = 0;
        var oFiltro      = {};
        oFiltro.where    = {};
        if(oParam.oData.iId!== undefined){
            oFiltro.where.Id = oParam.oData.iId;
        }
        if(oParam.oData.iVentaId!== undefined){
            oFiltro.where.VentaId = oParam.oData.iVentaId;
        } 
        oFiltro.where.EstadoId = 1;
        const acrualizarRegistroPromise = await ventaPago.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: venta_pago, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}