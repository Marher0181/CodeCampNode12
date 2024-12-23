const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Producto = sequelize.define('Producto', {
  idProducto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  CategoriaProductos_idCategoriaProducto: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuarios_idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  marca: {
    type: DataTypes.STRING(45)
  },
  codigo: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  stock: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estados_idEstado: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  fecha_creacion: {
    type: DataTypes.DATE
  },
  foto: {
    type: DataTypes.BLOB
  }
}, {
  tableName: 'Productos',  
  timestamps: false        
});

module.exports = Producto;
