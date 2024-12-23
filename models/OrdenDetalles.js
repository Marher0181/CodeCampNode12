const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const OrdenDetalle = sequelize.define('OrdenDetalle', {
  idOrdenDetalles: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orden_idOrden: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productos_idProductos: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'OrdenDetalles',  
  timestamps: false            
});

module.exports = OrdenDetalle;
