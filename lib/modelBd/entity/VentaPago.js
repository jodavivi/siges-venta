const Sequelize =  require('sequelize');
const db = require('../../config/db'); 
const Venta = require('./Venta');   

const VentaPago = db.define('venta_pago', { 
    Id : {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement : true
    },
    EstadoId            : Sequelize.INTEGER,
    UsuarioCreador      : Sequelize.STRING(64),
    FechaCreacion       : Sequelize.DATE,
    TerminalCreacion    : Sequelize.STRING(64),
    UsuarioModificador  : Sequelize.STRING,
    FechaModificacion   : Sequelize.DATE,
    TerminalModificador : Sequelize.STRING(64),
    TransaccionId       : Sequelize.STRING(64),
    VentaId         :  {
        type: Sequelize.INTEGER,
        references: {
            model: 'venta', // 'fathers' refers to table name
            key: 'Id', // 'id' refers to column name in fathers table
        }
    },
    Item                : Sequelize.INTEGER,  
    CodFormaPago      : Sequelize.STRING(8),  
    FormaPago       : Sequelize.STRING(64),  
    CodBanco           : Sequelize.STRING(8),  
    Banco           : Sequelize.STRING(64), 
    NumTarjeta      : Sequelize.STRING(32),  
    NumOperacion      : Sequelize.STRING(32), 
    Moneda          : Sequelize.STRING(8), 
    Importe          : Sequelize.FLOAT,
    ImporteTotal    : Sequelize.FLOAT
} 
,
{
    schema: "venta",
});

 
VentaPago.belongsTo(Venta, { as: "Venta",targetKey: 'Id',foreignKey: 'VentaId' });   
Venta.hasMany(VentaPago, { as: "VentaPago",foreignKey: 'VentaId' }); 

module.exports = VentaPago;