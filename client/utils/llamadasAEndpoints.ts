import { error } from "console";
import { Result } from "postcss";

const iniciarSesion = async (userName: String, password: String) => {
  try {
    const response = await fetch("http://localhost:3001/iniciarSesion", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });
    console.log(response)
    if (response.ok) {
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
};

const registrarUsuario = async (userName: String, password: String) => {
  try {
    const response = await fetch("http://localhost:3001/registrarUsuario", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });
    if (response.ok) {
      alert("Usuario registrado correctamente");
      return true
    } else {
      alert("Se ha producido un error al registrar el usuario");
      return false
    }
  } catch (error) {
    console.error("Error en la solicitud HTTP: " + error);
    return false
  }
};

const obtenerTareasDeUsuario = async () => {
  try {
    const response = await fetch("http://localhost:3001/tareas", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error ("Se ha producido un error al obtener las tareas")
    }
    const data = await response.json()
    return data
  }
  catch (error) {
    console.error("Se ha producido un error al obtener la respuesta JSON")
    throw error
  }
  
};

const nuevaTarea = async (
  titulo: String,
  contenido: String,
  hora: String,
  fecha: String,
  tipo: String
) => {
  try {
    const response = await fetch("http://localhost:3001/nuevaTarea", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ titulo, contenido, hora, fecha, tipo }),
    });
    if (!response.ok) {
      throw new Error ("Se ha producido un error al obtener las tareas")
    }
    const data = await response.json()
    alert(JSON.stringify(data))
    return data
  }
  catch (error) {
    console.error("Se ha producido un error al obtener la respuesta JSON")
    throw error
  }
};

module.exports = {
  iniciarSesion,
  registrarUsuario,
  obtenerTareasDeUsuario,
  nuevaTarea,
};