const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Definir un formato de logs personalizado para morgan
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':url :status - :response-time ms'));

// Configurar las rutas
app.use('/auth', authRoutes);

// Sincronizar la base de datos y arrancar el servidor
sequelize.sync().then(() => {
    app.listen(5000, () => {
        console.log('Servidor escuchando en puerto 5000');
    });
});