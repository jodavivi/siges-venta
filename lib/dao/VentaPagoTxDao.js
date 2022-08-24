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
 * @description Función que permite actualizar Venta 
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.actualizarVenta = async function (oParam) { 
    const oResponse = {};
    try {
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        
         
        if(oParam.oData.sCodPeriodo !== undefined){
            oRegistro.CodPeriodo     = oParam.oData.sCodPeriodo; 
        }

        if(oParam.oData.sPeriodo !== undefined){
            oRegistro.Periodo     = oParam.oData.sPeriodo; 
        } 
        if(oParam.oData.sClienteTipoDocCod !== undefined){
            oRegistro.ClienteTipoDocCod     = oParam.oData.sClienteTipoDocCod; 
        }
        if(oParam.oData.sClienteTipoDoc !== undefined){
            oRegistro.ClienteTipoDoc     = oParam.oData.sClienteTipoDoc; 
        }
        if(oParam.oData.sClienteNroIdentificacion !== undefined){
            oRegistro.ClienteNroIdentificacion     = oParam.oData.sClienteNroIdentificacion; 
        }
        if(oParam.oData.sClienteRazonSocial !== undefined){
            oRegistro.ClienteRazonSocial     = oParam.oData.sClienteRazonSocial; 
        }
        if(oParam.oData.sTipoDocumentoVentaCod !== undefined){
            oRegistro.TipoDocumentoVentaCod     = oParam.oData.sTipoDocumentoVentaCod; 
        }
        if(oParam.oData.sTipoDocumentoVenta !== undefined){
            oRegistro.TipoDocumentoVenta     = oParam.oData.sTipoDocumentoVenta; 
        }
        if(oParam.oData.sNumeroDoc !== undefined){
            oRegistro.NumeroDoc     = oParam.oData.sNumeroDoc; 
        }
        if(oParam.oData.sClienteTelefono !== undefined){
            oRegistro.ClienteTelefono     = oParam.oData.sClienteTelefono; 
        }
        if(oParam.oData.sClienteEmail !== undefined){
            oRegistro.ClienteEmail     = oParam.oData.sClienteEmail; 
        }
        if(oParam.oData.sMoneda !== undefined){
            oRegistro.Moneda     = oParam.oData.sMoneda; 
        } 
        if(oParam.oData.fMontoSubTotal !== undefined){
            oRegistro.MontoSubTotal     = oParam.oData.fMontoSubTotal; 
        }
        if(oParam.oData.fMontoIgv !== undefined){
            oRegistro.MontoIgv     = oParam.oData.fMontoIgv; 
        }
        if(oParam.oData.fMontoTotal !== undefined){
            oRegistro.MontoTotal     = oParam.oData.fMontoTotal; 
        }

        if(oParam.oData.fMontoRecibido !== undefined){
            oRegistro.MontoRecibido     = oParam.oData.fMontoRecibido; 
        }
        if(oParam.oData.fMontoVuelto !== undefined){
            oRegistro.MontoVuelto     = oParam.oData.fMontoVuelto; 
        }
        if(oParam.oData.fAjusteRedeondeo !== undefined){
            oRegistro.AjusteRedeondeo     = oParam.oData.fAjusteRedeondeo; 
        } 
        if(oParam.oData.sCodEstadoVenta !== undefined){
            oRegistro.CodEstadoVenta     = oParam.oData.sCodEstadoVenta; 
        }
        if(oParam.oData.sEstadoVenta !== undefined){
            oRegistro.EstadoVenta     = oParam.oData.sEstadoVenta; 
        }
 
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await venta.update(oRegistro, oFiltro);

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

/**
 * @description Función que permite eliminar Venta 
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.eliminarVenta = async function (oParam) { 
    const oResponse = {};
    try {
 
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        oRegistro.EstadoId             = 0;
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await venta.update(oRegistro, oFiltro);
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