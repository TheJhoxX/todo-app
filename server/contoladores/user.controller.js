const pool = require("../conexion");

function comprobarCredenciales(callback, data) {
  pool.getConnection((error, connection) => {
    if (error) {
      callback(error, null, null);
      return;
    }

    const sql = "SELECT * FROM usuarios WHERE nombre = ? AND password = ?";
    const values = [data.userName, data.password];

    connection.query(sql, values, (queryError, results) => {
      connection.release(); // Liberar la conexión cuando hayas terminado con ella

      if (queryError) {
        callback(queryError, null, null);
      } else {
        if (results.length > 0) {
          callback(null, true, results);
        } else {
          callback(null, false, null);
        }
      }
    });
  });
}

function registrarUsuario(callback, data) {
  pool.getConnection((error, connection) => {
    if (error) {
      callback(error, null);
      return;
    }

    const sql = "INSERT INTO usuarios (nombre, password) VALUES (?, ?)";
    const values = [data.userName, data.password];

    connection.query(sql, values, (queryError, results) => {
      connection.release(); // Liberar la conexión cuando hayas terminado con ella

      if (queryError) {
        console.log("SE HA PRODUCIDO UN ERROR AL ACCEDER A LA DB");
        callback(queryError, null);
      } else {
        callback(null, results);
      }
    });
  });
}

module.exports = { comprobarCredenciales, registrarUsuario };
