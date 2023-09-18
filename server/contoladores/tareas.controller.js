const pool = require("../conexion");

function obtenerTareasDeUsuario(callback, data) {
  pool.query(
    "SELECT * FROM tareas WHERE idUsuario = ? ORDER BY fechaLimite DESC",
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

function crearTarea(callback, data) {
  const [hora, minutos] = data.hora.split(":")
  const fecha = new Date(data.fecha)
  fecha.setHours(Number(hora), Number(minutos), 0, 0)

  pool.query(
    "INSERT INTO tareas (idUsuario, titulo, contenido, fechaLimite, tipo) VALUES (?,?,?,?,?)",
    [data.idUsuario, data.titulo, data.contenido, fecha, data.tipo],
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results)
      }
    }
  );
}

module.exports = { obtenerTareasDeUsuario, crearTarea };
