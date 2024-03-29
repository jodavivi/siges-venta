const venta     = require('../modelBd/entity/Venta'); 
const utilsDao  = require('./utils/utils'); 
const utilsGen  = require('../utils/utils'); 
const config    = require('../config/config.json');  

/**
 * @description Función que permite crear una venta
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.crearVenta = async function (oParam) { 
    const oResponse = {};
    try {
        var seqVenta = "'" +config.seqVenta +"'";
        var seq = await utilsDao.obtenetSequencia(seqVenta);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id                = parseInt(seq.oData, 10);
        oRegistro.EstadoId          = 1;
        oRegistro.UsuarioCreador    = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion     = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion  = oParam.oAuditRequest.sTerminal; 
        oRegistro.CodEmpresa         = oParam.oData.sCodEmpresa;  
        oRegistro.Empresa            = oParam.oData.sEmpresa;  
        oRegistro.CodSede            = oParam.oData.sCodSede;
        oRegistro.Sede               = oParam.oData.sSede;
        oRegistro.CodApertura        = oParam.oData.sCodApertura;
        oRegistro.CodPeriodo                = oParam.oData.sCodPeriodo;  
        oRegistro.CodPedido                 = oParam.oData.sCodPedido; 
        oRegistro.ClienteTipoDocCod         = oParam.oData.sClienteTipoDocCod;
        oRegistro.ClienteTipoDoc            = oParam.oData.sClienteTipoDoc;
        oRegistro.ClienteNroIdentificacion  = oParam.oData.sClienteNroIdentificacion; 
        oRegistro.ClienteRazonSocial        = oParam.oData.sClienteRazonSocial;
        oRegistro.TipoDocumentoVentaCod     = oParam.oData.sTipoDocumentoVentaCod;
        oRegistro.TipoDocumentoVenta        = oParam.oData.sTipoDocumentoVenta;
        oRegistro.NumeroDocVenta            = oParam.oData.sNumeroDocVenta;
        oRegistro.ClienteDireccion          = oParam.oData.sClienteDireccion;
        oRegistro.ClienteTelefono          = oParam.oData.sClienteTelefono;
        oRegistro.ClienteEmail             = oParam.oData.sClienteEmail;
        oRegistro.Moneda                    = oParam.oData.sMoneda;
        oRegistro.TipoCambio             = oParam.oData.fTipoCambio;
        oRegistro.MontoSubTotal         = oParam.oData.fMontoSubTotal;
        oRegistro.MontoIgv              = oParam.oData.fMontoIgv;
        oRegistro.MontoTotal            = oParam.oData.fMontoTotal; 
        oRegistro.MontoRecibido         = oParam.oData.fMontoRecibido;
        oRegistro.MontoVuelto           = oParam.oData.fMontoVuelto; 
        oRegistro.Descuento             = oParam.oData.fDescuento; 
        oRegistro.AjusteRedondeo       = oParam.oData.fAjusteRedondeo; 

        const crearRegistroPromise = await venta.create(oRegistro);
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

        if(oParam.oData.sCodPedido !== undefined){
            oRegistro.CodPedido     = oParam.oData.sCodPedido; 
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
        if(oParam.oData.sNumeroDocVenta !== undefined){
            oRegistro.NumeroDocVenta     = oParam.oData.sNumeroDocVenta; 
        }
        if(oParam.oData.sClienteDireccion !== undefined){
            oRegistro.ClienteDireccion     = oParam.oData.sClienteDireccion; 
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
        if(oParam.oData.fTipoCambio !== undefined){
            oRegistro.TipoCambio     = oParam.oData.fTipoCambio; 
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