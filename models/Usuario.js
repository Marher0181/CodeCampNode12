const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Usuario = sequelize.define('Usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rol_idRol: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estados_idEstado: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  correo_electronico: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  nombre_completo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fecha_creacion: {
    type: DataTypes.DATE
  },
  Clientes_idCliente: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Usuarios',  
  timestamps: false       
});

module.exports = Usuario;
