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
      alert("Autenticación exitosa");
      return true
    } else {
      alert("Autenticación ha fallado");
      return false
    }
  } catch (error) {
    console.error("Error en la solicitud HTTP: " + error);
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

module.exports = {iniciarSesion, registrarUsuario}