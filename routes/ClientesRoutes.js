const express = require('express');
const sequelize = require('../db/db');
const authenticateAndAuthorizeStr = require('../middlewares/auth');
const router = express.Router();

router.post('/add', authenticateAndAuthorizeStr("Administrador"), async (req, res) => {
    const { razon_social, nombre_comercial, direccion_entrega, telefono, email } = req.body;

    try {
        const result = await sequelize.query('EXEC sp_insertarCliente :razon_social, :nombre_comercial, :direccion_entrega, :telefono, :email', 
            { 
                replacements: { 
                    razon_social, 
                    nombre_comercial, 
                    direccion_entrega, 
                    telefono, 
                    email 
                }, 
                type: sequelize.QueryTypes.RAW
            }
        );

        res.status(201).json({ message: 'Cliente creado satisfactoriamente', result });
    } catch (err) {
        console.log('Error al ingresar cliente: ', err);
        res.status(500).json({ message: 'Error al ingresar cliente: ', err });
    }
});

router.put('/edit/:idCliente', authenticateAndAuthorizeStr("Administrador"), async (req, res) => {
    const { idCliente } = req.params;
    const { razon_social, nombre_comercial, direccion_entrega, telefono, email } = req.body;

    try {
        const result = await sequelize.query('EXEC sp_editarCliente :idCliente, :razon_social, :nombre_comercial, :direccion_entrega, :telefono, :email', 
            { 
                replacements: { 
                    idCliente, 
                    razon_social, 
                    nombre_comercial, 
                    direccion_entrega, 
                    telefono, 
                    email
                },
                type: sequelize.QueryTypes.RAW
            }
        );

        res.status(200).json({ message: 'Cliente modificado satisfactoriamente', result });
    } catch (err) {
        console.log('Error al modificar cliente: ', err);
        res.status(500).json({ message: 'Error al modificar cliente: ', error: err.message });
    }
});


module.exports = router;
