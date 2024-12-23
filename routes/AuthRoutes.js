const express = require('express');
const Rol = require('../models/Roles');
const router = express.Router();
const sequelize = require('../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'codecamp_secret'

router.post('/register', async (req, res) => {
    const { rolId, estadosId, nombreCompleto, correoElectronico, password, telefono, fechaNacimiento, idCliente } = req.body;

    if (!rolId || !estadosId || !nombreCompleto || !correoElectronico || !password || !telefono || !fechaNacimiento) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await sequelize.query(
            'EXEC sp_InsertarUsuarios :rolId, :estadosId, :correoElectronico, :nombreCompleto, :password, :telefono, :fechaNacimiento, :idCliente',
            {
                replacements: { rolId, estadosId, correoElectronico, nombreCompleto, password: hashedPassword, telefono, fechaNacimiento, idCliente },
                type: sequelize.QueryTypes.RAW
            }
        );

        res.status(201).json({ message: 'Usuario registrado correctamente', result });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
    }
});

  router.post('/login', async (req, res) => {
    const { correoElectronico, password } = req.body;
  
    try {
        const user = await sequelize.query(
            'SELECT idUsuario, rol_idRol, estados_idEstado, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, fecha_creacion, Clientes_idCliente FROM Usuarios WHERE correo_electronico = :correoElectronico',
            {
                replacements: { correoElectronico },
                type: sequelize.QueryTypes.SELECT
            }
        );
  
        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        console.log(user);
    
        const validPassword = await bcrypt.compare(password, user[0].password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
    
        const idRol =  user[0].rol_idRol;
        const rol = await sequelize.query('SELECT nombre FROM Roles WHERE idRol = :idRol',
        {
            replacements: { idRol },
            type: sequelize.QueryTypes.SELECT
        });

        const token = jwt.sign(
          { idUsuario: user[0].idUsuario, correoElectronico: user[0].correo_electronico, rolId: user[0].rol_idRol, rol: rol[0].nombre },
          SECRET_KEY,
          { expiresIn: '24h' }
        ); 
  
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
});

  module.exports = router;