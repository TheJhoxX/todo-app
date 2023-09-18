const express = require("express");
const session = require("express-session");
const cors = require("cors"); // Importa el paquete cors
const controladorUsuarios = require("./contoladores/user.controller");
const controladorTareas = require("./contoladores/tareas.controller")

const PORT = 3001;

const app = express();
app.use(
  session({
    secret: "mi-secreto",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // Porque no estoy usando https, sino -> true
  })
);
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


const comprobarDatosDeFormulario = (data) => {
  const { titulo, contenido, hora, fecha, tipo } = data;
  console.log(data)
  const validezDelFormulario = { formularioCorrecto: true, campos: {} }
  if ((!data.titulo) || (!data.contenido) || (!data.hora) || (!data.fecha) || (!data.tipo)) {
    validezDelFormulario.formularioCorrecto = false
  }
  data.titulo ? validezDelFormulario.campos.titulo = true : validezDelFormulario.campos.titulo = false
  data.contenido ? validezDelFormulario.campos.contenido = true : validezDelFormulario.campos.contenido = false
  data.hora ? validezDelFormulario.campos.hora = true : validezDelFormulario.campos.hora = false
  data.fecha ? validezDelFormulario.campos.fecha = true : validezDelFormulario.campos.fecha = false
  data.tipo ? validezDelFormulario.campos.tipo = true : validezDelFormulario.campos.tipo = false

  console.log(JSON.stringify(validezDelFormulario))
  return validezDelFormulario 
}



app.post("/iniciarSesion", async (req, res) => {
  if (!req.session.user) {
    controladorUsuarios.comprobarCredenciales(
      (errors, credencialesCorrectas, results) => {
        if (errors) {
          res
            .status(401)
            .send("Nombre de usuario y/o contraseña incorrectos: " + errors);
        } else {
          if (credencialesCorrectas === true) {
            console.log(results)
            req.session.user = {
              userId: results[0].id,
              username: results[0].nombre,
              password: results[0].password,
            };
            console.log("COOKIE:  " + JSON.stringify(req.session.user))
            res
              .status(200)
              .send("Credenciales correctas: " + JSON.stringify(req.body));
          } else {
            console.log("Nombre de usuario y/o contraseña incorrectos");
            res
              .status(401)
              .send("Nombre de usuario y/o contraseña incorrectos");
          }
        }
      },
      req.body
    );
  } else {
    console.log("Utilizando la cookie para el inicio de sesión");
    res
      .status(200)
      .send(
        "Utilizando la cookie para el inicio de sesión: " +
          JSON.stringify(req.session)
      );
  }
});

app.post("/registrarUsuario", async (req, res) => {
  controladorUsuarios.registrarUsuario((errors, results) => {
    if (errors) {
      res
        .status(401)
        .send("No se ha podido registrar al usuario:    " + errors);
    } else {
      res
        .status(200)
        .send(
          "Usuario registrado correctamente:    " + JSON.stringify(results)
        );
    }
  }, req.body);
});

app.get("/tareas", async (req, res) => {
  console.log("Usuario registrado en la cookie: "  + JSON.stringify(req.session.user))
  if (req.session.user) {
    controladorTareas.obtenerTareasDeUsuario((errors, results) => {
      if (errors) {
        res
          .status(401)
          .send(
            "Se ha producido un error al acceder a las tareas del usuario: " +
              errors
          );
      } else {
        console.log(results)
        res.status(200).json(results);
      }
    }, req.session.user);
  } else {
    console.log("Usuario no identificado");
  }
});

app.post("/nuevaTarea", async (req, res) => {

  const validezDelFormulario = comprobarDatosDeFormulario(req.body)
  if (validezDelFormulario.formularioCorrecto === false) {
    res
    .status(401)
    .json(validezDelFormulario)
  } else {
    const data = req.body
    data.idUsuario = req.session.user.userId
    controladorTareas.crearTarea((errors, results) => {
      if (errors) {
        console.error('ERROR: ' + errors)
        res.status(401).send("No se ha podido añadir la tarea:    " + errors);
      } else {
        res
          .status(200)
          .json({
            formularioCorrecto: true,
            campos: {
              titulo: true,
              contenido: true,
              hora: true,
              fecha: true,
              tipo: true,
            },
          });
      }
    }, data);
  }

  
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
