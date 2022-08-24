const Sequelize =  require('sequelize');
const db = require('../../config/db'); 
const Venta = require('./Venta');   

const VentaEstado = db.define('venta_estado', { 
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
    CodEstado   : {
        type: Sequelize.INTEGER,
        comment: '0:Eliminado, 1:Emitido, 2:Enviado Sunat, 3:Aprobado por Sunat, 4:Rechazodo por Sunat'
      },
    Estado      : Sequelize.STRING(32)  
     
} 
,
{
    schema: "venta",
});

 
VentaEstado.belongsTo(Venta, { as: "Venta",targetKey: 'Id',foreignKey: 'VentaId' });   
Venta.hasMany(VentaEstado, { as: "VentaEstado",foreignKey: 'VentaId' }); 

module.exports = VentaEstado;