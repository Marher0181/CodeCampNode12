const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Estado = sequelize.define('Estado', {
  idEstado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false
  }
}, {
  tableName: 'Estados',  
  timestamps: false      
});

module.exports = Estado;
