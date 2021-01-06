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

        oRegistro.SociedadId        = oParam.oData.iSociedadId;
        oRegistro.Sociedad          = oParam.oData.sSociedad;
        oRegistro.SedeId            = oParam.oData.iSedeId;
        oRegistro.Sede              = oParam.oData.sSede;
        oRegistro.AreaId            = oParam.oData.iAreaId;
        oRegistro.Area              = oParam.oData.sArea;
        oRegistro.AlmacenId         = oParam.oData.iAlmacenId;
        oRegistro.Almacen           = oParam.oData.sAlmacen;
        oRegistro.PedidoId          = oParam.oData.iPedidoId; 
        oRegistro.Periodo           = oParam.oData.sPeriodo;
        oRegistro.AperturaId        = oParam.oData.iAperturaId;
        oRegistro.ClienteTipoDocCod = oParam.oData.sClienteTipoDocCod;
        oRegistro.ClienteTipoDoc    = oParam.oData.sClienteTipoDoc;
        oRegistro.ClienteNroIdentificacion = oParam.oData.sClienteNroIdentificacion;
        oRegistro.ClienteNombre     = oParam.oData.sClienteNombre;
        oRegistro.ClienteApellido   = oParam.oData.sClienteApellido;
        oRegistro.ClienteRazonSocial= oParam.oData.sClienteRazonSocial; 
        oRegistro.TipoDocumentoVentaCod = oParam.oData.sTipoDocumentoVentaCod;
        oRegistro.TipoDocumentoVenta    = oParam.oData.sTipoDocumentoVenta;
        oRegistro.NumeroDoc             = oParam.oData.sNumeroDoc;
        oRegistro.ClienteTelefono       = oParam.oData.sClienteTelefono;
        oRegistro.ClienteEmail          = oParam.oData.sClienteEmail;
        oRegistro.Moneda                = oParam.oData.sMoneda;
        oRegistro.MontoSubTotal         = oParam.oData.fMontoSubTotal;
        oRegistro.MontoIgv              = oParam.oData.fMontoIgv;
        oRegistro.MontoTotal            = oParam.oData.fMontoTotal; 
        oRegistro.MontoRecibido         = oParam.oData.fMontoRecibido;
        oRegistro.MontoVuelto           = oParam.oData.fMontoVuelto; 
        oRegistro.AjusteRedeondeo       = oParam.oData.fAjusteRedeondeo; 
        oRegistro.FormaPagoCod          = oParam.oData.sFormaPagoCod;
        oRegistro.FormaPago             = oParam.oData.sFormaPago; 
        oRegistro.EstadoVentaId         = oParam.oData.iEstadoVentaId;
        oRegistro.EstadoVenta           = oParam.oData.sEstadoVenta;

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
        
        if(oParam.oData.iSociedadId !== undefined){
            oRegistro.SociedadId     = oParam.oData.iSociedadId; 
        }
        if(oParam.oData.sSociedad !== undefined){
            oRegistro.Sociedad     = oParam.oData.sSociedad; 
        }
        if(oParam.oData.iSedeId !== undefined){
            oRegistro.SedeId     = oParam.oData.iSedeId; 
        }
        if(oParam.oData.sSede !== undefined){
            oRegistro.Sede     = oParam.oData.sSede; 
        }
        if(oParam.oData.iAreaId !== undefined){
            oRegistro.AreaId     = oParam.oData.iAreaId; 
        }
        if(oParam.oData.sArea !== undefined){
            oRegistro.Area     = oParam.oData.sArea; 
        }
        if(oParam.oData.iAlmacenId !== undefined){
            oRegistro.AlmacenId     = oParam.oData.iAlmacenId; 
        }
        if(oParam.oData.sAlmacen !== undefined){
            oRegistro.Almacen     = oParam.oData.sAlmacen; 
        }
        if(oParam.oData.iPedidoId !== undefined){
            oRegistro.PedidoId     = oParam.oData.iPedidoId; 
        }

        if(oParam.oData.sPeriodo !== undefined){
            oRegistro.Periodo     = oParam.oData.sPeriodo; 
        }
        if(oParam.oData.iAperturaId !== undefined){
            oRegistro.AperturaId     = oParam.oData.iAperturaId; 
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
        if(oParam.oData.sClienteNombre !== undefined){
            oRegistro.ClienteNombre     = oParam.oData.sClienteNombre; 
        }
        if(oParam.oData.sClienteApellido !== undefined){
            oRegistro.ClienteApellido     = oParam.oData.sClienteApellido; 
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
        if(oParam.oData.sFormaPagoCod !== undefined){
            oRegistro.FormaPagoCod     = oParam.oData.sFormaPagoCod; 
        }
        if(oParam.oData.sFormaPago !== undefined){
            oRegistro.FormaPago     = oParam.oData.sFormaPago; 
        }
        if(oParam.oData.iEstadoVentaId !== undefined){
            oRegistro.EstadoVentaId     = oParam.oData.iEstadoVentaId; 
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