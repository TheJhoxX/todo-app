const mysql = require('mysql2');
require('dotenv').config(); // Cargar las variables de entorno desde un archivo .env

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost', // Utiliza la variable de entorno o un valor predeterminado
    user: process.env.DB_USER || 'root', // Utiliza la variable de entorno o un valor predeterminado
    password: process.env.DB_PASSWORD || 'root', // Utiliza la variable de entorno o un valor predeterminado
    database: process.env.DB_DATABASE || 'todoApp', // Utiliza la variable de entorno o un valor predeterminado
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 30000,
    connectTimeout: 30000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

module.exports = pool;
