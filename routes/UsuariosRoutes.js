const express = require('express');
const sequelize = require('../db/db');
const authenticateAndAuthorizeStr = require('../middlewares/auth');
const router = express.Router();

router.post('/add', authenticateAndAuthorizeStr("Admin"), async (req, res) => {
    const { rol_idRol, estados_idEstado, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, Clientes_idCliente } = req.body;

    try {
        
        const result = await sequelize.query('EXEC sp_insertarUsuario :rol_idRol, :estados_idEstado, :correo_electronico, :nombre_completo, :password, :telefono, :fecha_nacimiento, :Clientes_idCliente', 
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

router.put('/edit/:idUsuario', authenticateAndAuthorizeStr("Admin"), async (req, res) => {
    const { idUsuario } = req.params;
    const { rol_idRol, estados_idEstado, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, Clientes_idCliente } = req.body;

    try {
        
        const result = await sequelize.query('EXEC sp_editarUsuario :idUsuario, :rol_idRol, :estados_idEstado, :correo_electronico, :nombre_completo, :password, :telefono, :fecha_nacimiento, :Clientes_idCliente', 
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

module.exports = router;