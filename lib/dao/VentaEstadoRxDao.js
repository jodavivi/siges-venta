const venta  = require('../modelBd/entity/Venta');   
const db = require('../config/db');  
const { QueryTypes } = require('sequelize');
/**
 * @description Función que permite consultar el estado actual de la venta
 * @creation David Villanueva 16/01/2023
 * @update
 */
exports.consultarVentaEstadoActual = async function (oFiltro) { 
    
    const oResponse = {};

    try {  
        var aFiltroVenta = [];
        var sQueryVenta = `select xve.* from venta.venta_estado xve inner join ( 
            select MAX(sv.\"Id\") as \"Id\", sv.\"VentaId\" from ( 
            select ve.\"Id\", v.\"CodEmpresa\", ve.\"VentaId\", ve.\"CodEstado\", ve.\"Estado\"  from venta.venta v 
            inner join venta.venta_estado ve on v.\"Id\" = ve.\"VentaId\"  
            where v.\"CodEmpresa\" = ? and ve.\"VentaId\" = ?  and ve.\"EstadoId\" = 1 and v.\"EstadoId\" = 1 
            ) sv  group by sv.\"VentaId\" 
            ) xsve on xve.\"Id\" = xsve.\"Id\"`; 
        if(oFiltro.sCodEmpresa !== undefined){ 
            aFiltroVenta.push(oFiltro.sCodEmpresa);
        } 
        
        if(oFiltro.iVentaId !== undefined){ 
            aFiltroVenta.push(oFiltro.iVentaId);
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
            oResponse.sMessage  = 'No se encontro el estado del documentos de venta'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la query: venta_estado, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}

