"use client";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import SvgLista from "../components/svgLista";
import { useEffect, useState, useRef } from "react";
const llamadasAEndpoints = require("../utils/llamadasAEndpoints");

export default function App() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const iniciarSesion = () => {
    const userName = usernameRef.current.value;
    const password = passwordRef.current.value;
    llamadasAEndpoints.iniciarSesion(userName, password) 
      .then((sesionCorrecta : boolean) => {
        if (sesionCorrecta === false) {
          cambiarErrores(true)
        }
    })
  };

  const registrarUsuario = () => {
    const userName = usernameRef.current.value;
    const password = passwordRef.current.value;
    llamadasAEndpoints.registrarUsuario(userName, password).
      then((registroCorrecto: boolean) => {
        if (registroCorrecto === false) {
          cambiarErrores(true)
        }
    })
  };

  const [inicio, setInicio] = useState(true);
  const [sesionIncorrecta, setSesionIncorrecta] = useState(false);

  const cambiarInterfaz = () => {
    setInicio(!inicio); // Cambia el estado al opuesto del estado actual
    cambiarErrores(false)
  };

  const cambiarErrores = (nuevoEstado: boolean) => {
    setSesionIncorrecta(nuevoEstado);
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Card radius="lg" className="w-1/2 max-h-1/2">
        <CardHeader className="flex items-center justify-center flex-col w-full h-full">
          <SvgLista />
          <p className="text-lg font-semibold">todo-app</p>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col items-center justify-center gap-4 w-full h-full">
          <Input
            label="Nombre de usuario:"
            labelPlacement="inside"
            className="max-w-lg"
            radius="lg"
            isRequired
            isClearable
            ref={usernameRef}
            validationState={sesionIncorrecta ? "invalid" : "valid"}
            fullWidth={true}
          />
          <Input
            type="password"
            label="Contraseña:"
            labelPlacement="inside"
            className="max-w-lg"
            isRequired
            isClearable
            ref={passwordRef}
            validationState={sesionIncorrecta ? "invalid" : "valid"}
            fullWidth={true}
          />
          <Button
            onClick={inicio ? iniciarSesion : registrarUsuario}
            className="font-bold transition duration-200"
            color="primary"
            radius="lg"
            variant="shadow"
          >
            {inicio ? "Iniciar sesión" : "Registrar"}
          </Button>
        </CardBody>
        <CardFooter className="flex items-center justify-center gap-4 w-full h-full">
          <p>
            {inicio
              ? "¿Aún no dispones de una cuenta?"
              : "¿Ya dispones de una cuenta?"}
          </p>
          <p
            onClick={cambiarInterfaz}
            className="text-blue-700 hover:transition duration-200 hover:underline hover:cursor-pointer hover:text-yellow-500"
          >
            {inicio ? "Regístrate" : "Iniciar sesión"}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
