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
  const validezDelFormulario = { formularioCorrecto: true, campos: {} }
  if ((!titulo) || (!contenido) || (!hora) || (!fecha) || (!tipo)) {
    validezDelFormulario.formularioCorrecto = false
  }
  titulo ? validezDelFormulario.campos.titulo = true : validezDelFormulario.campos.titulo = false
  contenido ? validezDelFormulario.campos.contenido = true : validezDelFormulario.campos.contenido = false
  hora ? validezDelFormulario.campos.hora = true : validezDelFormulario.campos.hora = false
  fecha ? validezDelFormulario.campos.fecha = true : validezDelFormulario.campos.fecha = false
  tipo ? validezDelFormulario.campos.tipo = true : validezDelFormulario.campos.tipo = false

  console.log(JSON.stringify(validezDelFormulario))
  return validezDelFormulario 
}



app.post("/iniciarSesion", async (req, res) => {
  console.log(JSON.stringify(req.body))
  console.log("COOKIE:  " + JSON.stringify(req.session.user))
  if ((req.body.primerInicio === false)) {
    controladorUsuarios.comprobarCredenciales(
      (errors, credencialesCorrectas, results) => {
        if (errors) {
          res
            .status(401)
            .json({sesionCorrecta: false, primerInicio: false})
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
              .json({sesionCorrecta: true, primerInicio: false})
          } else {
            console.log("Nombre de usuario y/o contraseña incorrectos");
            res
              .status(401)
              .json({sesionCorrecta:false, primerInicio:false})
          }
        }
      },
      req.body
    );
  } else {
    if (req.session.user) {
      console.log("Utilizando la cookie para el inicio de sesión");
    res
      .status(200)
      .json({sesionCorrecta: true, primerInicio: true})
    }
    else {
      res.
        status(401)
      .json({sesionCorrecta: false, primerInicio:true})
    }
  }
});

app.post("/cerrarSesion", async (req, res) => {
  if (req.session.user) {
    req.session.user = undefined
    res.status(200).send("Sesión cerrada correctamente")
  } else {
    res.status(401).send("No hay sesión que cerrar")
  }
})

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
        res.status(200).json(results);
      }
    }, req.session.user);
  } else {
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

app.post("/eliminarTareas", async (req, res) => {
  console.log('TAREAS:  ' + JSON.stringify(req.body.identificadores))
  console.log('SESION:  ' + JSON.stringify(req.session.user))
  if (req.session.user) {
    controladorTareas.eliminarTareas((errors,results) => {
      if (errors) {
        res.status(404).json(
          {
            eliminacionCorrecta : false,
          }
        )
      } else {
        res.status(200).json(
          {
            eliminacionCorrecta: true,
          }
        )
      }
    }, req.body.identificadores)
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
