const ventaEstado   = require('../modelBd/entity/VentaEstado'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config   = require('../config/config.json');  

/**
 * @description Función que permite crear el estado de la venta
 * @creation David Villanueva 24/08/2022
 * @update
 */
exports.crearVentaEstado = async function (oParam) { 
    const oResponse = {};
    try {
        var seqVentaEstado = "'" +config.seqVentaEstado +"'";
        var seq = await utilsDao.obtenetSequencia(seqVentaEstado);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id                = parseInt(seq.oData, 10);
        oRegistro.EstadoId          = 1;
        oRegistro.UsuarioCreador    = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion     = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion  = oParam.oAuditRequest.sTerminal;
        
        oRegistro.VentaId          = oParam.oData.iVentaId;
        oRegistro.CodEstado         = oParam.oData.iCodEstado;
        oRegistro.Estado            = oParam.oData.sEstado; 
        const crearRegistroPromise = await ventaEstado.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: venta_estado, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}



/**
 * @description Función que permite eliminar los estados de la venta
 * @creation David Villanueva 16/01/2023
 * @update
 */
exports.eliminarVentaEstado = async function (oParam) { 
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
        const acrualizarRegistroPromise = await ventaEstado.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: venta, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}