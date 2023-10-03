const express = require("express");
const session = require("express-session");
const cors = require("cors"); // Importa el paquete cors
const controladorUsuarios = require("./contoladores/user.controller");
const controladorTareas = require("./contoladores/tareas.controller");
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
require("dotenv").config(); // Cargar las variables de entorno desde un archivo .env
const conexion = require("./conexion")

const PORT = process.env.PORT || 8080;


const app = express();

//Configure redis client
const redisClient = redis.createClient({
    host: process.env.SERVER_HOST,
    port: PORT
})

redisClient.on('error', function (err) {
  console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
  console.log('Connected to redis successfully');
});

// Middleware de sesión
app.use(
  session({
    secret: "mi-secreto",
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient }),
    secure: false,
    sameSite: 'none',
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  })
);

app.use(express.json());
app.use(
  cors({
    origin: ["https://todo-app-thejhoxx.vercel.app", "https://todo-app-thejhoxx.vercel.app/home"],
    credentials: true,
  })
);

const comprobarSesionMiddleware = (req, res, next) => {
  console.log(JSON.stringify(req.session));
  if (!req.session.user) {
    console.error("SESIÓN NO INICIADA");
    return res.status(401).json({ sesionIniciada: false });
  }
  next();
};

const comprobarDatosDeFormulario = (data) => {
  const { titulo, contenido, hora, fecha, tipo } = data;
  const validezDelFormulario = { formularioCorrecto: true, campos: {} };
  if (!titulo || !contenido || !hora || !fecha || !tipo) {
    validezDelFormulario.formularioCorrecto = false;
  }
  titulo
    ? (validezDelFormulario.campos.titulo = true)
    : (validezDelFormulario.campos.titulo = false);
  contenido
    ? (validezDelFormulario.campos.contenido = true)
    : (validezDelFormulario.campos.contenido = false);
  hora
    ? (validezDelFormulario.campos.hora = true)
    : (validezDelFormulario.campos.hora = false);
  fecha
    ? (validezDelFormulario.campos.fecha = true)
    : (validezDelFormulario.campos.fecha = false);
  tipo
    ? (validezDelFormulario.campos.tipo = true)
    : (validezDelFormulario.campos.tipo = false);

  console.log(JSON.stringify(validezDelFormulario));
  return validezDelFormulario;
};

app.get("/", async (req, res) => {
  return "Accede a: https://todo-app-thejhoxx.vercel.app/";
});

app.post("/iniciarSesion", async (req, res) => {
  console.log("ACCEDIENDO A INICIO DE SESIÓN: ");
  console.log(JSON.stringify(req.body.userName));
  if (req.body.primerInicio === false) {
    controladorUsuarios.comprobarCredenciales(
      (errors, credencialesCorrectas, results) => {
        if (errors) {
          res.status(401).json({ sesionCorrecta: false, primerInicio: false });
        } else {
          if (credencialesCorrectas === true) {
            console.log("SESSION ANTES DE FIJAR EL USUARIO: " + JSON.stringify(req.session));
            req.session.user = {
              userId: results[0].id,
              username: results[0].nombre,
            };
            console.log("COOKIE CON EL USUARIO FIJADO:  " + JSON.stringify(req.session));
            res.status(200).json({ sesionCorrecta: true, primerInicio: false });
          } else {
            console.log("Nombre de usuario y/o contraseña incorrectos");
            res
              .status(401)
              .json({ sesionCorrecta: false, primerInicio: false });
          }
        }
      },
      req.body
    );
  } else {
    if (req.session.user) {
      console.log("Utilizando la cookie para el inicio de sesión");
      res.status(200).json({ sesionCorrecta: true, primerInicio: true });
    } else {
      res.status(401).json({ sesionCorrecta: false, primerInicio: true });
    }
  }
});

app.post("/cerrarSesion", comprobarSesionMiddleware, async (req, res) => {
  console.log("ACCESO A CERRAR SESIÓN:  ");
  console.log(JSON.stringify(req.session.user));
  req.session.user = undefined;
  res.status(200).send("Sesión cerrada correctamente");
});

app.post("/registrarUsuario", async (req, res) => {
  console.log("ACCEDIENDO A REGISTRO: ");
  console.log(JSON.stringify(req.body.userName));
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

app.get("/tareas", comprobarSesionMiddleware, async (req, res) => {
  console.log("ACCEDIENDO A TAREAS: ");
  console.log(JSON.stringify(req.body));
  controladorTareas.obtenerTareasDeUsuario((errors, results) => {
    if (errors) {
      res
        .status(401)
        .send(
          "Se ha producido un error al acceder a las tareas del usuario: " +
            errors
        );
    } else {
      res.status(200).json({ tareas: results });
    }
  }, req.session.user);
});

app.post("/nuevaTarea", comprobarSesionMiddleware, async (req, res) => {
  console.log("ACCEDIENDO A NUEVA TAREA:  ");
  console.log(JSON.stringify(req.body));
  const validezDelFormulario = comprobarDatosDeFormulario(req.body);
  if (validezDelFormulario.formularioCorrecto === false) {
    res.status(401).json(validezDelFormulario);
  } else {
    const data = req.body;
    data.idUsuario = req.session.user.userId;
    controladorTareas.crearTarea((errors, results) => {
      if (errors) {
        console.error("ERROR: " + errors);
        res.status(401).send("No se ha podido añadir la tarea:    " + errors);
      } else {
        res.status(200).json({
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

app.post("/eliminarTareas", comprobarSesionMiddleware, async (req, res) => {
  console.log("ACCEDIENDO A ELIMINAR TAREAS:  ");
  console.log(JSON.stringify(req.body));
  controladorTareas.eliminarTareas((errors, results) => {
    if (errors) {
      res.status(404).json({
        eliminacionCorrecta: false,
      });
    } else {
      res.status(200).json({
        eliminacionCorrecta: true,
      });
    }
  }, req.body.identificadores);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
