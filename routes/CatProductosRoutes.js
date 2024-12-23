const express = require('express');
const sequelize = require('../db/db');
const authenticateAndAuthorizeStr = require('../middlewares/auth');
const router = express.Router();

router.post('/add', authenticateAndAuthorizeStr("Administrador"), async (req, res) => {
    const { usuarios_idUsuario, nombre, estados_idEstado } = req.body;

    try {
        
        const result = await sequelize.query('EXEC sp_insertarCategoriaProductos :usuarios_idUsuario, :nombre, :estados_idEstado', 
            { 
                replacements: { 
                    usuarios_idUsuario, 
                    nombre, 
                    estados_idEstado 
                }, 
                type: sequelize.QueryTypes.RAW
            }
        );

        res.status(201).json({ message: 'Categoría de producto creada satisfactoriamente', result });
    } catch (err) {
        console.log('Error al ingresar categoría de producto: ', err);
        res.status(500).json({ message: 'Error al ingresar categoría de producto: ', err });
    }
});

router.put('/edit/:idCategoriaProducto', authenticateAndAuthorizeStr("Administrador"), async (req, res) => {
    const { idCategoriaProducto } = req.params;
    const { usuarios_idUsuario, nombre, estados_idEstado } = req.body;

    try {
        
        const result = await sequelize.query('EXEC sp_editarCategoriaProductos :idCategoriaProducto, :usuarios_idUsuario, :nombre, :estados_idEstado', 
            { 
                replacements: { 
                    idCategoriaProducto, 
                    usuarios_idUsuario, 
                    nombre, 
                    estados_idEstado
                },
                type: sequelize.QueryTypes.RAW
            }
        );

        res.status(200).json({ message: 'Categoría de producto modificada satisfactoriamente', result });
    } catch (err) {
        console.log('Error al modificar categoría de producto: ', err);
        res.status(500).json({ message: 'Error al modificar categoría de producto: ', error: err.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const result = await sequelize.query('SELECT * FROM CategoriaProductos', 
            { 
                type: sequelize.QueryTypes.SELECT
            }
        );

        res.status(200).json({ message: 'Categorías de productos obtenidas satisfactoriamente', result });
    } catch (err) {
        console.log('Error al obtener categorías de productos: ', err);
        res.status(500).json({ message: 'Error al obtener categorías de productos: ', err });
    }
});

module.exports = router;
