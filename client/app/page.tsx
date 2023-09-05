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

export default function App() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const iniciarSesion = async () => {
    const userName = usernameRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await fetch("http://localhost:3001/iniciarSesion", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });
      if (response.ok) {
        alert("Autenticación exitosa");
      } else {
        alert("Autenticación ha fallado");
      }
    } catch (error) {
      console.error("Error en la solicitud HTTP: " + error);
    }
  };

  const [data, setData] = useState(null);

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Card radius="lg" className="max-w-1/2 max-h-1/2">
        <CardHeader className="flex items-center justify-center flex-col">
          <SvgLista />
          <p className="text-lg font-semibold">todo-app</p>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col items-center justify-center gap-4">
          <Input
            label="Nombre de usuario:"
            labelPlacement="inside"
            className="max-w-xs"
            radius="lg"
            isRequired
            isClearable
            ref={usernameRef}
          />
          <Input
            type="password"
            label="Contraseña:"
            labelPlacement="inside"
            className="max-w-xs"
            isRequired
            isClearable
            ref={passwordRef}
          />
          <Button
            onClick={iniciarSesion}
            className="font-bold"
            color="primary"
            radius="lg"
            variant="shadow"
          >
            Iniciar sesión
          </Button>
        </CardBody>
        <CardFooter className="flex items-center justify-around gap-4">
          <p>¿Aún no dispones de una cuenta?</p>
          <p className="text-blue-700 hover:transition duration-1000 hover:underline hover:cursor-pointer hover:text-yellow-500">Regístrate</p>
        </CardFooter>
      </Card>
    </div>
  );
}
