const express = require('express');
const sequelize = require('../db/db');
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

module.exports = router;
