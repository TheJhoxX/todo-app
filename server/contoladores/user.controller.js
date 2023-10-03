const pool = require("../conexion");

function comprobarCredenciales(callback, data) {
  pool.query(
    "SELECT * FROM usuarios WHERE nombre = ? AND password = ?",
    [data.userName, data.password],
    (error, results) => {
      if (error) {
        callback(error, null, null);
      } else {
        if (results.length > 0) {
          callback(null, true, results);
        } else {
          callback(null, false, null);
        }
      }
    }
  );
}

function registrarUsuario(callback, data) {
  pool.query(
    "INSERT INTO usuarios (nombre, password) VALUES (?,?)",
    [data.userName, data.password],
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
}

module.exports = { comprobarCredenciales, registrarUsuario };
