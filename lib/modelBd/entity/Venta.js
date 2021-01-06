const Sequelize =  require('sequelize');
const db = require('../../config/db'); 

db.createSchema("ventas").then(() => {
    // esquema para el producto
});

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
    SociedadId                  : Sequelize.INTEGER, 
    Sociedad                    : Sequelize.STRING(16), 
    SedeId                      : Sequelize.INTEGER, 
    Sede                        : Sequelize.STRING(64),
    AreaId                      : Sequelize.INTEGER, 
    Area                        : Sequelize.STRING(64),
    AlmacenId                   : Sequelize.INTEGER,   
    Almacen                     : Sequelize.STRING(64),
    PedidoId                    : Sequelize.INTEGER,
    PeriodoId                   : Sequelize.INTEGER,
    Periodo                     : Sequelize.STRING(16),
    AperturaId                  : Sequelize.INTEGER,
    ClienteTipoDocCod           : Sequelize.STRING(16),
    ClienteTipoDoc              : Sequelize.STRING(64),
    ClienteNroIdentificacion    : Sequelize.STRING(16),
    ClienteNombre               : Sequelize.STRING(128),
    ClienteApellido             : Sequelize.STRING(128),
    ClienteRazonSocial          : Sequelize.STRING(128),
    TipoDocumentoVentaCod       : Sequelize.STRING(16),
    TipoDocumentoVenta          : Sequelize.STRING(64),
    NumeroDoc                   : Sequelize.STRING(16),
    ClienteTelefono             : Sequelize.STRING(16),
    ClienteEmail                : Sequelize.STRING(64),
    Moneda                      : Sequelize.STRING(8),
    MontoSubTotal               : Sequelize.FLOAT,
    MontoIgv                    : Sequelize.FLOAT,
    MontoTotal                  : Sequelize.FLOAT,
    MontoRecibido               : Sequelize.FLOAT,
    MontoVuelto                 : Sequelize.FLOAT,
    AjusteRedeondeo             : Sequelize.FLOAT,
    FormaPagoCod                : Sequelize.STRING(16),
    FormaPago                   : Sequelize.STRING(64),
    EstadoVentaId               : Sequelize.INTEGER,
    EstadoVenta                 : Sequelize.STRING(64)
} 
,
{
    schema: "ventas"
});

 
module.exports = Venta;