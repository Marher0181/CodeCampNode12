const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ClaseA_MarlonHernandez', 'ADMIN', 'ADMIN123', {
  host: 'DESKTOP-HMS6GDC',
  dialect: 'mssql',
  dialectOptions: {
      options: {
          encrypt: true,
      },
  },
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = sequelize;