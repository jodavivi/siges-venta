const venta  = require('../modelBd/entity/Venta');   
const db = require('../config/db');  
const { QueryTypes } = require('sequelize');
/**
 * @description Función que permite consultar las ventas
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.consultarVentas = async function (oFiltro) { 
    
    const oResponse = {};

    try {  
        var aFiltroVenta = [];
        var sQueryVenta = `select v.*, xve.\"CodEstado\", xve.\"Estado\" from venta.venta v
        inner join (select Max(ve.\"Id\") as \"Id\", ve.\"VentaId\", ve.\"CodEstado\", ve.\"Estado\"  from venta.venta_estado ve
        where ve.\"EstadoId\" = 1
        group by ve.\"VentaId\", ve.\"CodEstado\", ve.\"Estado\" ) xve
        on v.\"Id\" =xve.\"VentaId\"
        where v.\"EstadoId\" = 1  `;

        if(oFiltro.iId !== undefined){
            sQueryVenta = sQueryVenta + " and v.\"Id\" = ? ";
            aFiltroVenta.push(oFiltro.iId);
        }  

        if(oFiltro.sCodEmpresa !== undefined){
            sQueryVenta = sQueryVenta + " and v.\"CodEmpresa\" = ? ";
            aFiltroVenta.push(oFiltro.sCodEmpresa);
        } 
         
        if(oFiltro.sCodSede !== undefined){
            sQueryVenta = sQueryVenta + " and v.\"CodSede\" = ? ";
            aFiltroVenta.push(oFiltro.sCodSede);
        }

        if(oFiltro.sCodPedido !== undefined){
            sQueryVenta = sQueryVenta + " and v.\"CodPedido\" = ? ";
            aFiltroVenta.push(oFiltro.sCodPedido);
        }

        if(oFiltro.sUsuario !== undefined){
            sQueryVenta = sQueryVenta + " and v.\"UsuarioCreador\" = ? ";
            aFiltroVenta.push(oFiltro.sUsuario);
        } 

        if(oFiltro.dFechaInicial !== undefined){
            sQueryVenta = sQueryVenta + " and v.\"FechaCreacion\" >= ? ";
            aFiltroVenta.push(oFiltro.dFechaInicial + " 00:00:00");
        } 

        if(oFiltro.dFechaFinal !== undefined){
            sQueryVenta = sQueryVenta + " and v.\"FechaCreacion\" <= ? ";
            aFiltroVenta.push(oFiltro.dFechaFinal + " 23:59:59");
        }

        if(oFiltro.sClienteNroIdentificacion !== undefined){
            sQueryVenta = sQueryVenta + " and v.\"ClienteNroIdentificacion\" <= ? ";
            aFiltroVenta.push(oFiltro.sClienteNroIdentificacion);
        }

        if(oFiltro.sTipoDocumentoVentaCod !== undefined){
            sQueryVenta = sQueryVenta + " and v.\"TipoDocumentoVentaCod\" = ? ";
            aFiltroVenta.push(oFiltro.TipoDocumentoVentaCod);
        }

        if(oFiltro.sNumeroDocVenta !== undefined){
            sQueryVenta = sQueryVenta + " and v.\"NumeroDocVenta\" = ? ";
            aFiltroVenta.push(oFiltro.sNumeroDocVenta);
        }  
        const aListaData = await db.query(sQueryVenta, 
                                        { replacements: aFiltroVenta,
                                            //logging: console.log,
                                            type: QueryTypes.SELECT 
                                        }
        ); 
        if(aListaData.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = aListaData;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información de de documentos de venta'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la query: venta, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}

