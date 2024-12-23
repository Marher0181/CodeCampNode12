const express = require('express');
const sequelize = require('../db/db');
const router = express.Router();
const authenticateAndAuthorizeStr = require('../middlewares/auth');

router.post('/add', async (req, res) => {
    const {
        usuarios_idUsuario, 
        estados_idEstado, 
        nombre_completo, 
        direccion, 
        telefono, 
        correo_electronico, 
        fecha_entrega, 
        total_orden, 
        detallesOrden
    } = req.body;

    try {
        const ordenData = {
            usuarios_idUsuario,
            estados_idEstado,
            nombre_completo,
            direccion,
            telefono,
            correo_electronico,
            fecha_entrega,
            total_orden,
            Detalles: detallesOrden
        };

        const jsonEntry = JSON.stringify(ordenData);

        const result = await sequelize.query(
            `DECLARE @JSON NVARCHAR(MAX); 
             DECLARE @IdResultado INT; 
             DECLARE @Resultado NVARCHAR(255); 
             SET @JSON = :jsonEntry; 
             EXEC SP_Ordenes_Insertar @JSON, @IdResultado OUTPUT, @Resultado OUTPUT; 
             SELECT @IdResultado AS IdResultado, @Resultado AS Resultado;`,
            {
                replacements: { jsonEntry },
                type: sequelize.QueryTypes.RAW,
            }
        );
        console.log(result);
        const { IdResultado, Resultado } = result[0];

        res.status(201).json({
            message: Resultado || 'Orden creada satisfactoriamente',
            idResultado: IdResultado
        });

    } catch (err) {
        console.log('Error al ingresar orden: ', err);
        res.status(500).json({ message: 'Error al ingresar orden: ', err });
    }
});

router.put('/edit/:id', authenticateAndAuthorizeStr("Administrador"), async (req, res) => {
    const { id } = req.params;
    const { 
        usuarios_idUsuario,
        estados_idEstado,
        nombre_completo,
        direccion,
        telefono,
        correo_electronico,
        fecha_entrega,
        total_orden 
    } = req.body;

    try {
        const result = await sequelize.query(
            'EXECUTE [dbo].[sp_editarOrdenes] ' +
            '@idOrden = :id, ' +
            '@usuarios_idUsuario = :usuarios_idUsuario, ' +
            '@estados_idEstado = :estados_idEstado, ' +
            '@nombre_completo = :nombre_completo, ' +
            '@direccion = :direccion, ' +
            '@telefono = :telefono, ' +
            '@correo_electronico = :correo_electronico, ' +
            '@fecha_entrega = :fecha_entrega, ' +
            '@total_orden = :total_orden', 
            { 
                replacements: {
                    id,
                    usuarios_idUsuario,
                    estados_idEstado,
                    nombre_completo,
                    direccion,
                    telefono,
                    correo_electronico,
                    fecha_entrega,
                    total_orden
                },
                type: sequelize.QueryTypes.RAW
            }
        );

        res.status(200).json({
            message: 'Orden modificada satisfactoriamente',
            result
        });
    } catch (err) {
        console.log('Error al modificar la orden: ', err);
        res.status(500).json({ message: 'Error al modificar la orden: ', error: err.message });
    }
});


module.exports = router;
