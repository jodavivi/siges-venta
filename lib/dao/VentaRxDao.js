const venta  = require('../modelBd/entity/Venta');   

/**
 * @description Función que permite consultar las ventas
 * @creation David Villanueva 06/01/2021
 * @update
 */
exports.consultarVentas = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={}; 
        if(oFiltro.iPedidoId !== undefined){
            oFiltroLista.where.PedidoId  = oFiltro.iPedidoId; 
        } 
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        }  
        oFiltroLista.where.EstadoId     = 1;  
        const consultarListaResponse = await  venta.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información de ventas'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: venta, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}