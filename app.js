const express = require('express');
const sequelize = require('./db/db');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');

//Rutas
const authRoutes = require('./routes/AuthRoutes');
const categoriaProductoRoutes = require('./routes/CatProductosRoutes');
const clientesRoutes = require('./routes/ClientesRoutes');
const estadosRoutes = require('./routes/EstadosRoutes');
const ordenRoutes = require('./routes/OrdenesRoutes');
const productoRoutes = require('./routes/ProductosRoutes');
const rolesRoutes = require('./routes/RolesRoutes');
const usuarioRoutes = require('./routes/UsuariosRoutes');

const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoriaProductoRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/estados', estadosRoutes);
app.use('/api/ordenes', ordenRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/usuarios', usuarioRoutes);

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Conexión a la base de datos establecida');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });