const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Orden = sequelize.define('Orden', {
  idOrden: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarios_idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estados_idEstado: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  nombre_completo: {
    type: DataTypes.STRING(100)
  },
  direccion: {
    type: DataTypes.STRING(545),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  correo_electronico: {
    type: DataTypes.STRING(70),
    allowNull: false
  },
  fecha_entrega: {
    type: DataTypes.DATE
  },
  total_orden: {
    type: DataTypes.DECIMAL(10, 2)
  }
}, {
  tableName: 'Ordenes',  
  timestamps: false      
});

module.exports = Orden;
