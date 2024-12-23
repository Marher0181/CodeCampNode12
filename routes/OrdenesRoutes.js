const express = require('express');
const sequelize = require('../db/db');
const authenticateAndAuthorizeStr = require('../middlewares/auth');
const router = express.Router();

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
        const detallesJson = JSON.stringify(detallesOrden);

        // Preparar el JSON completo
        const ordenData = {
            orden: {
                usuarios_idUsuario,
                estados_idEstado,
                nombre_completo,
                direccion,
                telefono,
                correo_electronico,
                fecha_entrega,
                total_orden
            },
            Detalles: detallesJson
        };

        // Ejecutar la consulta con los parámetros
        const result = await sequelize.query(
            `DECLARE @IdResultado INT, @Resultado NVARCHAR(255);
             EXEC SP_Ordenes_Insertar 
                 @JSON = :JSON, 
                 @IdResultado OUTPUT, 
                 @Resultado OUTPUT;`, 
            {
                replacements: {
                    JSON: JSON.stringify(ordenData)  // Parametro de entrada
                },
                type: sequelize.QueryTypes.RAW
            }
        );

        // Leer los parámetros de salida
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




module.exports = router;
