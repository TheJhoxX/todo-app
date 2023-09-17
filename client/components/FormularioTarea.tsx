import React, { useState } from "react";
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

interface FormularioTareaProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function MiComponente({
  isOpen,
  onOpenChange,
}: FormularioTareaProps) {
  const [value, setValue] = React.useState<Selection>(new Set([]));
  const [fechaSeleccionada, setFechaSeleccionada] = React.useState<Date | undefined>();
  const [horaSeleccionada, setHoraSeleccionada] = React.useState<String | undefined>()

  const color = () => {
    if (Array.from(value)[0] === "normal") {
      return "primary";
    } else if (Array.from(value)[0] === "opcional") {
      return "secondary";
    } else if (Array.from(value)[0] === "importante") {
      return "danger";
    } else {
      return "default";
    }
  };

  const handleFechaSeleccionada = (fechaSeleccionada: Date | undefined) => {
    setFechaSeleccionada(fechaSeleccionada)
  }

  const handleCambioHora = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)

    setHoraSeleccionada(event.target.value)
  }

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
                />
                <Select
                  selectionMode="single"
                  color={color()}
                  selectedKeys={value}
                  onSelectionChange={setValue}
                  placeholder="Elige cómo de importante es la tarea"
                  label="Importancia"
                  size="md"
                  isRequired
                  radius="lg"
                  variant="flat"
                >
                  <SelectItem key={"normal"} value={"Normal"}>
                    Normal
                  </SelectItem>
                  <SelectItem key={"importante"} value={"Importante"}>
                    Importante
                  </SelectItem>
                  <SelectItem key={"opcional"} value={"Opcional"}>
                    Opcional
                  </SelectItem>
                </Select>
                <div className="flex w-full items-center justify-start">
                  <p>Selecciona una hora y un dia:</p>
                  <p className="text-danger">*</p>
                </div>
                <input type="time" className="rounded-lg text-center p-4" onChange={handleCambioHora} />
                <Calendario cambiarFechaSeleccionada={handleFechaSeleccionada} />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  radius="lg"
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button color="primary" radius="lg" onPress={onClose}>
                  Añadir
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
