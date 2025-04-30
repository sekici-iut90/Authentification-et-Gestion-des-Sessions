const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');
const sequelize = require('./config/database');
const app = express();

app.use(cors());

app.use(express.json());

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Authentification',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Tables créées ou mises à jour');
  })
  .catch((err) => {
    console.error('Erreur lors de la synchronisation des tables:', err);
  });

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/api', (req, res) => {
  res.send('Hello World');
});

const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend lancé sur http://localhost:${PORT}`);
  console.log(`📄 Swagger disponible sur http://localhost:${PORT}/api-docs`);
});
