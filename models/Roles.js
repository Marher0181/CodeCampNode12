const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Rol = sequelize.define('Roles', {
    idRol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});

module.exports = Rol;
