import React, { useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Selection,
  Textarea,
} from "@nextui-org/react";
import Calendario from "./Calendario";
const llamadasAEndpoints = require('../utils/llamadasAEndpoints')

interface FormularioTareaProps {
  isOpen: boolean;
  onOpenChange: () => void;
  getTareas: () => void;
}

interface camposFormulario  {
  formularioCorrecto: boolean;
  campos: {
    [campo: string]: boolean;
  };
};

export default function FormularioTarea({
  isOpen,
  onOpenChange,
  getTareas,
}: FormularioTareaProps) {
  
  const contenidoRef = useRef<HTMLInputElement | null>(null);
  const tituloRef = useRef<HTMLInputElement | null>(null);

  const [tipo, setTipo] = React.useState<Selection>(new Set([]));
  const [tipoValido, setTipoValido] = React.useState(true)
  const [fechaSeleccionada, setFechaSeleccionada] = React.useState<Date | undefined>(undefined);
  const [fechaValida, setFechaValida] = React.useState(true)
  const [horaSeleccionada, setHoraSeleccionada] = React.useState<String | undefined>(undefined)
  const [horaValida, setHoraValida] = React.useState(true)
  const [tituloValido, setTituloValido] = React.useState<Boolean>(true);
  const [contenidoValido, setContenidoValido] = React.useState<Boolean>(true);
  const [errores, setErrores] = React.useState<String | undefined>(undefined)
  const [longitudContenido, setLongitudContenido] = React.useState(0)
  const [longitudTitulo, setLongitudTitulo] = React.useState(0)


  const color = () => {
    if (Array.from(tipo)[0] === "normal") {
      return "primary";
    } else if (Array.from(tipo)[0] === "opcional") {
      return "secondary";
    } else if (Array.from(tipo)[0] === "importante") {
      return "danger";
    } else {
      return "default";
    }
  };

  const reset = () => {
    setTipo(new Set([]))
    setTipoValido(true)
    setFechaSeleccionada(undefined)
    setFechaValida(true)
    setHoraSeleccionada(undefined)
    setHoraValida(true)
    setTituloValido(true)
    setContenidoValido(true)
    setErrores(undefined)
    setLongitudContenido(0)
    setLongitudTitulo(0)
  }

  const handleFechaSeleccionada = (fechaSeleccionada: Date | undefined) => {
    setFechaSeleccionada(fechaSeleccionada)
  }

  const handleCambioHora = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHoraSeleccionada(event.target.value)
  }

  const handleNuevaTarea =  async (): Promise<boolean> => {
   
    const titulo = tituloRef.current ? tituloRef.current.value : null
    const contenido = contenidoRef.current ? contenidoRef.current.value : null
    const hora = horaSeleccionada
    const fecha = fechaSeleccionada
    const tipoDeTarea = Array.from(tipo)[0];


    try {
      const camposCorrectos: camposFormulario = await llamadasAEndpoints.nuevaTarea(
        titulo,
        contenido,
        hora,
        fecha?.toISOString(),
        tipoDeTarea
      );
    
      if (camposCorrectos.formularioCorrecto === false) {
        setErrores('Faltan campos por rellenar');
        !camposCorrectos.campos.titulo ? setTituloValido(false) : setTituloValido(true);
        !camposCorrectos.campos.contenido ? setContenidoValido(false) : setContenidoValido(true);
        !camposCorrectos.campos.hora ? setHoraValida(false) : setHoraValida(true);
        !camposCorrectos.campos.tipo ? setTipoValido(false) : setTipoValido(true);
        !camposCorrectos.campos.fecha ? setFechaValida(false) : setFechaValida(true);
        return false;
      } else {
        getTareas();
        reset();
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <>
      <Modal
        scrollBehavior="inside"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        shadow="lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-center capitalize">
                <h1 className="text-xl">Añadir tarea</h1>
              </ModalHeader>
              <ModalBody className="flex flex-col items-center gap-4">
                <Input
                  type="text"
                  isClearable
                  isRequired
                  radius="lg"
                  size="md"
                  label="Título"
                  description={
                    "Titulo que se va visualizar en las tareas. (" +
                    longitudTitulo +
                    "/60)"
                  }
                  validationState={tituloValido ? "valid" : "invalid"}
                  maxLength={60}
                  onChange={() => {
                    if (tituloRef.current) {
                      if (tituloRef.current.value.length <= 1000) {
                        setLongitudTitulo(tituloRef.current.value.length);
                      }
                    }
                  }}
                  ref={tituloRef}
                />
                <Textarea
                  type="text"
                  isRequired
                  minRows={2}
                  maxRows={2}
                  radius="lg"
                  size="md"
                  label="Contenido"
                  onChange={() => {
                    if (contenidoRef.current) {
                      if (contenidoRef.current.value.length <= 1000) {
                        setLongitudContenido(contenidoRef.current.value.length);
                      }
                    }
                  }}
                  description={
                    "Una descripción de la tarea a realizar. (" +
                    longitudContenido +
                    "/1000)"
                  }
                  ref={contenidoRef}
                  validationState={contenidoValido ? "valid" : "invalid"}
                  maxLength={1000}
                />
                <Select
                  selectionMode="single"
                  color={color()}
                  selectedKeys={tipo}
                  onSelectionChange={setTipo}
                  placeholder="Elige cómo de importante es la tarea"
                  label="Importancia"
                  size="md"
                  isRequired
                  radius="lg"
                  variant="flat"
                  description={
                    <p className={`transition duration-300 ${tipoValido ? "" : "text-danger"}`}>
                      Selecciona la importancia de la tarea
                    </p>
                  }
                >
                  <SelectItem key={"normal"} value={"normal"}>
                    Normal
                  </SelectItem>
                  <SelectItem key={"importante"} value={"importante"}>
                    Importante
                  </SelectItem>
                  <SelectItem key={"opcional"} value={"opcional"}>
                    Opcional
                  </SelectItem>
                </Select>
                <div className="flex w-full items-center justify-start">
                  <p>Selecciona una hora y un dia:</p>
                  <p className="text-danger">*</p>
                </div>
                <input
                  type="time"
                  className={`rounded-lg text-center p-4 transition duration-300 ${
                    horaValida ? "" : "bg-danger"
                  }`}
                  onChange={handleCambioHora}
                />
                <div className={`transition duration-300 ${fechaValida ? "" : "rounded-2xl border-danger border-2 "}`}>
                  <Calendario
                    cambiarFechaSeleccionada={handleFechaSeleccionada}
                  />
                </div>
              </ModalBody>
              <ModalFooter className="flex items-center justify-between gap-4">
                <div className="w-3/5">
                  <p className="text-danger">{errores}</p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <Button
                    color="danger"
                    variant="flat"
                    radius="lg"
                    onPress={() => {
                      reset()
                      onClose()
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    color="primary"
                    radius="lg"
                    onPress={() => {
                      handleNuevaTarea().then((envioExitoso) => {
                        if (envioExitoso) {
                          onClose()
                        }
                      })
                    }}
                  >
                    Añadir
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
