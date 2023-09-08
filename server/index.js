const express = require("express");
const session = require("express-session");
const cors = require("cors"); // Importa el paquete cors
const controladorUsuarios = require("./contoladores/user.controller");
// Configuración de express-session

const PORT = 3001;

const app = express();
app.use(
  session({
    secret: "mi-secreto",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // Porque no estoy usando https, sino -> true
  }))
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));


app.post("/iniciarSesion", async (req, res) => {
  
  if (!req.session.user) {
    controladorUsuarios.comprobarCredenciales((errors, credencialesCorrectas, results) => {
      if (errors) {
        res
          .status(401)
          .send("Nombre de usuario y/o contraseña incorrectos: " + errors);
      } else {
        if (credencialesCorrectas === true) {
          req.session.user = results
          res
            .status(200)
            .send(
              "Credenciales correctas: " +
                JSON.stringify(req.body)
            );
        } else {
          console.log('Nombre de usuario y/o contraseña incorrectos')
          res
            .status(401)
            .send("Nombre de usuario y/o contraseña incorrectos");
        }
      }
    }, req.body);
  } else {
    console.log("Utilizando la cookie para el inicio de sesión")
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

app.get('/prueba', async (req, res) => {
  console.log(JSON.stringify(req.session.user))
  res.status(200).send(JSON.stringify(req.session.user))
})

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
