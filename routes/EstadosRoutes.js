const express = require('express');
const Estado = require('../models/Estados');
const router = express.Router();
const sequelize = require('../db/db');
const authenticateAndAuthorizeStr = require('../middlewares/auth');

router.post('/add', authenticateAndAuthorizeStr("Administrador"), async (req, res) => {
    const { nombre } = req.body;

    try{
        const result = await sequelize.query('EXEC sp_insertarEstados :nombre', 
            { 
                replacements: {nombre}, 
                type: sequelize.QueryTypes.RAW
            }
        );

        res.status(201).json({message: 'Estado creado satisfactoriamente', result});
    } catch(err){

        console.log('Error al ingresar Estado: ', err);
        res.status(500).json({ message: 'Error al ingresar Estado: ', err});

    }
})

router.put('/edit/:id', authenticateAndAuthorizeStr("Administrador"), async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        const result = await sequelize.query('EXEC sp_editarEstado @idEstado = :id, @nombre = :nombre', 
            { 
                replacements: { id, nombre },
                type: sequelize.QueryTypes.RAW
            }
        );

        res.status(200).json({ message: 'Estado modificado satisfactoriamente', result });
    } catch (err) {
        console.log('Error al modificar Estado: ', err);
        res.status(500).json({ message: 'Error al modificar Estado: ', error: err.message });
    }
});

router.get('/all', authenticateAndAuthorizeStr("Administrador"), async (req, res) => {
    try {
        const result = await sequelize.query(
            'SELECT * FROM Estados', 
            { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        res.status(200).json({ message: 'Estados obtenidos satisfactoriamente', result });
    } catch (err) {
        console.log('Error al obtener estados: ', err);
        res.status(500).json({ message: 'Error al obtener estados: ', err });
    }
});

module.exports = router;