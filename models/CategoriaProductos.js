const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const CategoriaProducto = sequelize.define('CategoriaProducto', {
  idCategoriaProducto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarios_idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  estados_idEstado: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'CategoriaProductos',  
  timestamps: false                 
});

module.exports = CategoriaProducto;
