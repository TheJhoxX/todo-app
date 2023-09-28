"use client";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Tabs,
  Tab,
} from "@nextui-org/react";
import SvgLista from "../components/SvgLista";
import { useEffect, useState, useRef, Key } from "react";
import { useRouter } from "next/navigation";

const llamadasAEndpoints = require("../utils/llamadasAEndpoints");

export default function App() {
  const router = useRouter();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const iniciarSesion = async (primerInicio: boolean) => {
    const userName = usernameRef.current.value;
    const password = passwordRef.current.value;
    const inicioDeSesion = await llamadasAEndpoints.iniciarSesion(
      userName,
      password,
      primerInicio
    );

    console.log(JSON.stringify(inicioDeSesion));

    if (inicioDeSesion.primerInicio === false) {
      if (inicioDeSesion.sesionCorrecta === true) {
        router.push("/home");
      } else {
        cambiarErrores(true);
      }
    }
    else {
      if (inicioDeSesion.sesionCorrecta) {
        router.push("/home");
      }
    }
  };

  const registrarUsuario = () => {
    const userName = usernameRef.current.value;
    const password = passwordRef.current.value;
    llamadasAEndpoints
      .registrarUsuario(userName, password)
      .then((registroCorrecto: boolean) => {
        if (registroCorrecto === false) {
          cambiarErrores(true);
        } else {
          setRegistroCorrecto(true)

          cambiarErrores(false);
        }
      });
    
    console.log(registroCorrecto)
  };

  useEffect(() => {
    iniciarSesion(true);
  }, []);

  const handleIniciarSesion = () => {
    iniciarSesion(false);
  };

  const [inicio, setInicio] = useState("login");
  const [sesionIncorrecta, setSesionIncorrecta] = useState(false);
  const [registroCorrecto, setRegistroCorrecto] = useState(false)

  const cambiarErrores = (nuevoEstado: boolean) => {
    setSesionIncorrecta(nuevoEstado);
  };

  const handleSelectionChange = (key: Key) => {
    cambiarErrores(false)
    setRegistroCorrecto(false)
    console.log(inicio);
    setInicio(key.toString());
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Card radius="lg" className="w-1/2 md:w-2/5 lg:w-2/5 max-h-1/2">
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
            variant="bordered"
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
            variant="bordered"
          />
          <Button
            onPress={
              inicio === "login" ? handleIniciarSesion : registrarUsuario
            }
            className="font-bold transition duration-200"
            color="primary"
            radius="full"
            variant="shadow"
            size="md"
          >
            {inicio === "login" ? "Iniciar sesión" : "Registrar"}
          </Button>
          {(inicio === "login") ? (
            sesionIncorrecta ? (
              <p className="text-danger transition duration-200">
                Ha habido un error con el nombre de usuario y/o contraseña
              </p>
            ) : null
          ) : (
            registroCorrecto ?
            <p className="text-success transition duration-200">
                Usuario registrado correctamente
            </p>
            : null    
          )}
        </CardBody>
        <CardFooter className="flex flex-col items-center justify-center gap-4 w-full h-full">
          <p className="text-justify">
            {inicio === "login"
              ? "¿Aún no dispones de una cuenta? ¡Regístrate!"
              : "¿Ya dispones de una cuenta? ¡Inicia sesión!"}
          </p>

          <Tabs
            fullWidth
            selectedKey={inicio}
            onSelectionChange={handleSelectionChange}
          >
            <Tab key="login" title="Iniciar sesión"></Tab>
            <Tab key="register" title="Registrar"></Tab>
          </Tabs>
        </CardFooter>
      </Card>
    </div>
  );
}
