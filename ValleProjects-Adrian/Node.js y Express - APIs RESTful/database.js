const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'basedatosadrian'
});

connection.connect((err) => {
    if(err) {
        console.error('Error database', err);
        return
    }
    console.log('conexion exitosa a MYSQL')
});

module.exports = connection;