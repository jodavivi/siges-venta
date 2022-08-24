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
