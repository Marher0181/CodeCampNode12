const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Cliente = sequelize.define('Cliente', {
  idCliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  razon_social: {
    type: DataTypes.STRING(245),
    allowNull: false
  },
  nombre_comercial: {
    type: DataTypes.STRING(34),
    allowNull: false
  },
  direccion_entrega: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false
  }
}, {
  tableName: 'Clientes',  
  timestamps: false       
});

module.exports = Cliente;
