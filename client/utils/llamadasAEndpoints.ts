const urlBackend = "http://localhost:8080"

const iniciarSesion = async (userName: String, password: String, primerInicio: boolean) => {
  try {
    console.log(urlBackend)
    const response = await fetch(urlBackend + "/iniciarSesion", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ userName, password, primerInicio }),
    });
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      const data = await response.json()
      return data
    }
  } catch (error) {
    console.error("Se ha producido un error al iniciar sesión:  " + error)
  }
};

const registrarUsuario = async (userName: String, password: String) => {
  try {
    const response = await fetch(urlBackend + "/registrarUsuario", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });
    if (response.ok) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error("Error en la solicitud HTTP: " + error);
    return false
  }
};

const obtenerTareasDeUsuario = async () => {
  try {
    const response = await fetch(urlBackend + "/tareas", {
      method: "GET",
      credentials: "include",
    });
    
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
    const response = await fetch(urlBackend + "/nuevaTarea", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ titulo, contenido, hora, fecha, tipo }),
    });
    if (!response.ok) {
      const data = await response.json()
      return data
    }
    const data = await response.json()
    return data
  }
  catch (error) {
    console.error("Se ha producido un error al obtener la respuesta JSON")
    throw error
  }
};

const cerrarSesion = async () => {
  try {
    const response = await fetch(urlBackend + "/cerrarSesion", {
      method: "POST",
      credentials: "include",
    })
    if (!response.ok) {
      const data = await response
      return data
    }
    const data = await response
    return data
  }
  catch (error) {
    console.error("Se ha producido un error al cerrar sesión")
    throw error
  }
}

const eliminarTareas = async (
  identificadores: number[]
) => {
  try {
    const response = await fetch(urlBackend + "/eliminarTareas", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identificadores }),
    })
    if (!response.ok) {
      const data = await response.json()
      return data
    }
    const data = await response.json()
    return data
  }
  catch (error) {
    console.error("Se ha producido un error al eliminar las tareas")
    throw error
  }
}

module.exports = {
  iniciarSesion,
  registrarUsuario,
  obtenerTareasDeUsuario,
  nuevaTarea,
  cerrarSesion,
  eliminarTareas,
};