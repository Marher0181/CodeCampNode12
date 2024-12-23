const express = require('express');
const sequelize = require('../db/db');
const authenticateAndAuthorizeStr = require('../middlewares/auth');
const router = express.Router();

router.post('/add', authenticateAndAuthorizeStr("Administrador"), async (req, res) => {
    const {
        CategoriaProductos_idCategoriaProducto,
        usuarios_idUsuario,
        nombre,
        marca,
        codigo,
        stock,
        estados_idEstado,
        precio,
        foto
    } = req.body;

    try {
        const result = await sequelize.query('EXEC sp_insertarProducto :CategoriaProductos_idCategoriaProducto, :usuarios_idUsuario, :nombre, :marca, :codigo, :stock, :estados_idEstado, :precio, :foto', 
            { 
                replacements: { 
                    CategoriaProductos_idCategoriaProducto, 
                    usuarios_idUsuario, 
                    nombre, 
                    marca, 
                    codigo, 
                    stock, 
                    estados_idEstado, 
                    precio, 
                    foto 
                }, 
                type: sequelize.QueryTypes.RAW
            }
        );

        res.status(201).json({ message: 'Producto creado satisfactoriamente', result });
    } catch (err) {
        console.log('Error al ingresar producto: ', err);
        res.status(500).json({ message: 'Error al ingresar producto: ', err });
    }
});

router.put('/edit/:idProducto', authenticateAndAuthorizeStr("Administrador"), async (req, res) => {
    const { idProducto } = req.params;
    const {
        CategoriaProductos_idCategoriaProducto,
        usuarios_idUsuario,
        nombre,
        marca,
        codigo,
        stock,
        estados_idEstado,
        precio,
        foto
    } = req.body;

    try {
        const result = await sequelize.query('EXEC sp_editarProducto :idProducto, :CategoriaProductos_idCategoriaProducto, :usuarios_idUsuario, :nombre, :marca, :codigo, :stock, :estados_idEstado, :precio, :foto', 
            { 
                replacements: { 
                    idProducto, 
                    CategoriaProductos_idCategoriaProducto, 
                    usuarios_idUsuario, 
                    nombre, 
                    marca, 
                    codigo, 
                    stock, 
                    estados_idEstado, 
                    precio, 
                    foto
                },
                type: sequelize.QueryTypes.RAW
            }
        );

        res.status(200).json({ message: 'Producto modificado satisfactoriamente', result });
    } catch (err) {
        console.log('Error al modificar producto: ', err);
        res.status(500).json({ message: 'Error al modificar producto: ', error: err.message });
    }
});

module.exports = router;
