const pool = require("../conexion");

function obtenerTareasDeUsuario(callback, data) {
  pool.query(
    "SELECT * FROM tareas WHERE idUsuario = ?",
    [data.userId],
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        if (results.length > 0) {
          callback(null, results);
        } else {
          callback(null, null);
        }
      }
    }
  );
}

module.exports = { obtenerTareasDeUsuario };
