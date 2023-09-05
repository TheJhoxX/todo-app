const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'todoApp',
    waitForConnections: true, // Esperar conexiones si el pool está lleno
    connectionLimit: 10, // Número máximo de conexiones en el pool
    queueLimit: 0 // Sin límite de colas para conexiones en espera
});

module.exports = pool;
