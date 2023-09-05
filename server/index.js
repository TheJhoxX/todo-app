const express = require("express");
const session = require("express-session");
const cors = require("cors"); // Importa el paquete cors
const controladorUsuarios = require("./contoladores/user.controller");
// Configuración de express-session

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: "mi-secreto",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // Porque no estoy usando https, sino -> true
  })
);

app.post("/iniciarSesion", async (req, res) => {
  if (!req.session.user) {
    controladorUsuarios.comprobarCredenciales((errors, results) => {
      if (errors) {
        res
          .status(401)
          .send("Nombre de usuario y/o contraseña incorrectos: " + errors);
      } else {
        res
          .status(200)
          .send("Inicio de sesión correcto" + JSON.stringify(results));
        req.session.user = results;
        console.log("Usuario almacenado en la sesión:   " + JSON.stringify(req.session.user));
      }
    }, req.body);
  } else {
    res
      .status(200)
      .send("El usuario ya ha iniciado sesión: " + JSON.stringify(req.session.user));
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
  if (req.session.user) {
    console.log("Usuario accediendo a sus tareas");
  } else {
    console.log("Usuario no identificado");
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
