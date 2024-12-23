const express = require('express');
const sequelize = require('../db/db');
const authenticateAndAuthorizeStr = require('../middlewares/auth');
const router = express.Router();

router.post('/add', authenticateAndAuthorizeStr("Administrador"), async (req, res) => {
    const { rol_idRol, estados_idEstado, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, Clientes_idCliente } = req.body;

    try {
        
        const result = await sequelize.query('EXEC sp_insertarUsuarios :rol_idRol, :estados_idEstado, :correo_electronico, :nombre_completo, :password, :telefono, :fecha_nacimiento, :Clientes_idCliente', 
            { 
                replacements: { 
                    rol_idRol, 
                    estados_idEstado, 
                    correo_electronico, 
                    nombre_completo, 
                    password, 
                    telefono, 
                    fecha_nacimiento, 
                    Clientes_idCliente 
                }, 
                type: sequelize.QueryTypes.RAW
            }
        );

        res.status(201).json({ message: 'Usuario creado satisfactoriamente', result });
    } catch (err) {
        console.log('Error al ingresar usuario: ', err);
        res.status(500).json({ message: 'Error al ingresar usuario: ', err });
    }
});

router.put('/edit/:idUsuario', authenticateAndAuthorizeStr("Administrador"), async (req, res) => {
    const { idUsuario } = req.params;
    const { rol_idRol, estados_idEstado, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, Clientes_idCliente } = req.body;

    try {
        
        const result = await sequelize.query('EXEC sp_editarUsuarios :idUsuario, :rol_idRol, :estados_idEstado, :correo_electronico, :nombre_completo, :password, :telefono, :fecha_nacimiento, :Clientes_idCliente', 
            { 
                replacements: { 
                    idUsuario, 
                    rol_idRol, 
                    estados_idEstado, 
                    correo_electronico, 
                    nombre_completo, 
                    password, 
                    telefono, 
                    fecha_nacimiento, 
                    Clientes_idCliente 
                },
                type: sequelize.QueryTypes.RAW
            }
        );

        res.status(200).json({ message: 'Usuario modificado satisfactoriamente', result });
    } catch (err) {
        console.log('Error al modificar usuario: ', err);
        res.status(500).json({ message: 'Error al modificar usuario: ', error: err.message });
    }
});

router.get('/all', authenticateAndAuthorizeStr("Administrador"), async (req, res) => {
    try {
        const result = await sequelize.query(
            'SELECT * FROM Usuarios', 
            { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        res.status(200).json({
            message: 'Usuarios obtenidos satisfactoriamente',
            result
        });
    } catch (err) {
        console.log('Error al obtener usuarios: ', err);
        res.status(500).json({ message: 'Error al obtener usuarios: ', err });
    }
});


module.exports = router;
