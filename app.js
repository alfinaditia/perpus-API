const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const memberRoutes = require('./routes/memberRoutes');
const loanRoutes = require('./routes/loanRoutes');
const penaltyRoutes = require('./routes/penaltyRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(bodyParser.json());

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Library API PERPUS',
        version: '1.0.0',
        description: 'Library API Information',
        contact: {
          name: 'Muhamad Alfin Aditiaputra'
        },
        servers: [
          {
            url: 'http://localhost:3000'
          }
        ]
      }
    },
    apis: ['./routes/*.js'] // Path to the API docs
  };
  
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/books', bookRoutes);
app.use('/members', memberRoutes);
app.use('/loans', loanRoutes);
app.use('/penalties', penaltyRoutes);

module.exports = app;
