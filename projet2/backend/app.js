const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');
const sequelize = require('./config/database');
const app = express();

// Middleware CORS
app.use(cors());

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Options de configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Authentification',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Assure-toi que le serveur est en cours d'exécution
      },
    ],
  },
  apis: ['./routes/*.js'], // Assure-toi que le chemin est correct
};

// Génération de la documentation Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Middleware Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Route d'exemple
app.get('/api', (req, res) => {
  res.send('Hello World');
});

// Importer et utiliser les routes d'authentification
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

// Synchronisation avec la base de données
sequelize.sync({ alter: true })
    .then(() => {
      console.log('Tables créées ou mises à jour');
    })
    .catch((err) => {
      console.error('Erreur lors de la synchronisation des tables:', err);
    });

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Serveur backend lancé sur http://localhost:${PORT}`);
  console.log(`Swagger disponible sur http://localhost:${PORT}/api-docs`);
});
