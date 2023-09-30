const mysql = require('mysql2');
require('dotenv').config(); // Cargar las variables de entorno desde un archivo .env

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost', // Utiliza la variable de entorno o un valor predeterminado
    user: process.env.DB_USER || 'root', // Utiliza la variable de entorno o un valor predeterminado
    password: process.env.DB_PASSWORD || 'root', // Utiliza la variable de entorno o un valor predeterminado
    database: process.env.DB_DATABASE || 'todoApp', // Utiliza la variable de entorno o un valor predeterminado
    waitForConnections: true, // Esperar conexiones si el pool está lleno
    connectionLimit: 10, // Número máximo de conexiones en el pool
    queueLimit: 3 // Sin límite de colas para conexiones en espera
});

module.exports = pool;
