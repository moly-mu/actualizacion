const express = require('express');
const router = express.Router();
const connection = require('./database.js');

// Ruta para obtener todos los usuarios
router.get('/', (req, res) => {
    connection.query('SELECT * FROM tabla1', (err, results) => {
        if (err) {
            res.status(500).send('Error en la base de datos');
            return;
        }
        res.json(results);
    });
});

// Ruta para agregar un nuevo usuario
router.post('/agregar', (req, res) => {
    const { nombre, precio, cantidad } = req.body;
    const query = 'INSERT INTO tabla1 (nombre, precio, cantidad) VALUES (?, ?, ?)';
    
    connection.query(query, [nombre, precio, cantidad], (err, results) => {
        if (err) {
            res.status(500).send('Error al agregar');
            return;
        }
        res.status(201).send('agregado');
    });
});

// Ruta para eliminar un usuario
router.delete('/eliminar/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM tabla1 WHERE id = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send('Error al eliminar');
            return;
        }
        res.send('eliminado');
    });
});

// Ruta para modificar un usuario
router.put('/modificar/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, precio, cantidad } = req.body;
    const query = 'UPDATE tabla1 SET nombre = ?, precio = ?, cantidad = ? WHERE id = ?';

    connection.query(query, [nombre, precio, cantidad, id], (err, results) => {
        if (err) {
            res.status(500).send('Error al modificar');
            return;
        }
        res.send('modificado');
    });
});

module.exports = router;
