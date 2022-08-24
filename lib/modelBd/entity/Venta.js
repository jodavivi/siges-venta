const Sequelize =  require('sequelize');
const db = require('../../config/db'); 

const Venta = db.define('venta', { 
    Id : {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement : true
    },
    EstadoId            : Sequelize.INTEGER,
    UsuarioCreador      : Sequelize.STRING(64),
    FechaCreacion       : Sequelize.DATE,
    TerminalCreacion    : Sequelize.STRING(64),
    UsuarioModificador  : Sequelize.STRING(64),
    FechaModificacion   : Sequelize.DATE,
    TerminalModificador : Sequelize.STRING(64),
    TransaccionId       : Sequelize.STRING(64), 
    CodEmpresa                  : Sequelize.STRING(4), 
    Empresa                     : Sequelize.STRING(64), 
    CodSede                     : Sequelize.STRING(4), 
    Sede                        : Sequelize.STRING(64), 
    CodPeriodo                  : Sequelize.STRING(8),
    CodApertura                 : Sequelize.STRING(8),
    CodPedido                   : Sequelize.STRING(10),  
    ClienteTipoDocCod           : Sequelize.STRING(16),
    ClienteTipoDoc              : Sequelize.STRING(64),
    ClienteNroIdentificacion    : Sequelize.STRING(16), 
    ClienteRazonSocial          : Sequelize.STRING(128),
    TipoDocumentoVentaCod       : Sequelize.STRING(16),
    TipoDocumentoVenta          : Sequelize.STRING(64),
    NumeroDocVenta              : Sequelize.STRING(32),
    ClienteTelefono             : Sequelize.STRING(16),
    ClienteEmail                : Sequelize.STRING(64),
    ClienteDireccion            : Sequelize.STRING(128),
    Moneda                      : Sequelize.STRING(8),
    TipoCambio                  : Sequelize.FLOAT,
    MontoSubTotal               : Sequelize.FLOAT,
    MontoIgv                    : Sequelize.FLOAT,
    MontoTotal                  : Sequelize.FLOAT,
    MontoRecibido               : Sequelize.FLOAT,
    Descuento                   : Sequelize.FLOAT,
    MontoVuelto                 : Sequelize.FLOAT,
    AjusteRedondeo              : Sequelize.FLOAT
} 
,
{
    schema: "venta"
}); 

 
module.exports = Venta;