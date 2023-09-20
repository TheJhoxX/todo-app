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
  
  const contenidoRef = useRef(null)
  const tituloRef = useRef(null)

  const [tipo, setTipo] = React.useState<Selection>(new Set([]));
  const [fechaSeleccionada, setFechaSeleccionada] = React.useState<Date | undefined>();
  const [horaSeleccionada, setHoraSeleccionada] = React.useState<String | undefined>()
  const [tituloValido, setTituloValido] = React.useState<Boolean>(true);
  const [contenidoValido, setContenidoValido] = React.useState<Boolean>(true);
  const [errores, setErrores] = React.useState<String | undefined>()



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

  const handleFechaSeleccionada = (fechaSeleccionada: Date | undefined) => {
    setFechaSeleccionada(fechaSeleccionada)
  }

  const handleCambioHora = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHoraSeleccionada(event.target.value)
  }

  const handleNuevaTarea = () => {
   
    const titulo = tituloRef.current ? tituloRef.current.value : null
    const contenido = contenidoRef.current ? contenidoRef.current.value : null
    const hora = horaSeleccionada
    const fecha = fechaSeleccionada
    const tipoDeTarea = tipo

    llamadasAEndpoints
      .nuevaTarea(titulo,contenido, hora, fecha?.toISOString(), tipoDeTarea.currentKey)
      .then((camposCorrectos: camposFormulario) => {
        console.log(JSON.stringify(camposCorrectos))
        if (camposCorrectos.formularioCorrecto === false) {
          setErrores('Faltan campos por rellenar')
          !camposCorrectos.campos.titulo ? setTituloValido(false) : setTituloValido(true)
          !camposCorrectos.campos.contenido ? setContenidoValido(false) : setContenidoValido(true)
          camposCorrectos.campos.hora ? setHoraSeleccionada(undefined) : setContenidoValido(camposCorrectos.campos.hora)
        } 
        else {
          getTareas()
        }
      });
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
                  description="Título que aparecerá al visualizar las tareas"
                  validationState={tituloValido ? "valid" : "invalid"}
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
                  description="Datos adicionales / una descripción sobre la tarea"
                  ref={contenidoRef}
                  validationState={contenidoValido ? "valid" : "invalid"}
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
                  description={Array.from(tipo).length > 0 ? '' : 'Selecciona la importancia de la tarea'}
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
                  className={`rounded-lg text-center p-4 transition duration-300 ${horaSeleccionada ? '' : 'bg-danger'}`}
                  onChange={handleCambioHora}
                />
                <Calendario
                  cambiarFechaSeleccionada={handleFechaSeleccionada}
                />
              </ModalBody>
              <ModalFooter className="flex items-center justify-between gap-4">
                <div className="w-3/5">
                  <p className="text-danger">{ errores }</p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <Button
                    color="danger"
                    variant="flat"
                    radius="lg"
                    onPress={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    color="primary"
                    radius="lg"
                    onPress={handleNuevaTarea}
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
