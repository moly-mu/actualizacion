const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Usar las rutas definidas en routes.js
app.use('/', routes);

app.listen(port, () => {
    console.log(`Servidor escuchando en ${port}`);
});
