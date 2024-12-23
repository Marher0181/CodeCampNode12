const express = require('express');
const Rol = require('../models/Roles');
const router = express.Router();
const sequelize = require('../db/db');
const authenticateAndAuthorizeStr = require('../middlewares/auth');

router.post('/add', authenticateAndAuthorizeStr("Administrador"), async (req, res) => {
    const { nombre } = req.body;

    try{
        const result = await sequelize.query('EXEC sp_insertarRoles :nombre', 
            { 
                replacements: {nombre}, 
                type: sequelize.QueryTypes.RAW
            }
        );

        res.status(201).json({message: 'Rol creado satisfactoriamente', result});
    } catch(err){

        console.log('Error al ingresar rol: ', err);
        res.status(500).json({ message: 'Error al ingresar rol: ', err});

    }
})

router.put('/edit/:id', authenticateAndAuthorizeStr("Administrador"), async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        const result = await sequelize.query('EXEC sp_editarRoles @idRol = :id, @nombre = :nombre', 
            { 
                replacements: { id, nombre },
                type: sequelize.QueryTypes.RAW
            }
        );

        res.status(200).json({ message: 'Rol modificado satisfactoriamente', result });
    } catch (err) {
        console.log('Error al modificar rol: ', err);
        res.status(500).json({ message: 'Error al modificar rol: ', error: err.message });
    }
});


module.exports = router;