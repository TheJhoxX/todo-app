import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  Divider,
  ModalProps,
  ScrollShadow,
} from "@nextui-org/react";
import React from "react";
import DangerIcon from "./DangerIcon";

interface detallesTarea {
  isOpen: boolean;
  onOpenChange: () => void;
  titulo: string;
  contenido: string;
  tipo: string;
  fechaLimite: string;
  tareaFueraDeFecha: boolean;
}

export default function DetallesDeTarea({
  isOpen,
  onOpenChange,
  titulo,
  contenido,
  tipo,
  fechaLimite,
  tareaFueraDeFecha,
}: detallesTarea) {

  const [scrollBehavior, setScrollBehavior] = React.useState<ModalProps["scrollBehavior"]>("inside");

  const color = () => {
    if (tipo === "normal") {
      return "primary";
    } else if (tipo === "opcional") {
      return "secondary";
    } else if (tipo === "importante") {
      return "danger";
    }
  };

  const fecha = new Date(fechaLimite);
  const dia = fecha.getDate();
  const mes = fecha.getMonth();
  const annyo = fecha.getFullYear();
  const hora = fecha.getHours();
  const minuto = fecha.getMinutes();

  return (
    <>
      <Modal
        scrollBehavior="inside"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        shadow="lg"
        size="md"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="w-full flex items-center justify-center capitalize">
                <ScrollShadow
                  className="flex w-11/12 gap-2 items-center justify-center"
                  orientation="horizontal"
                  size={8}
                >
                  <h1 className="text-xl overflow-x-scroll text-center">
                    {titulo}
                  </h1>
                </ScrollShadow>
              </ModalHeader>
              <Divider />
              <ModalBody className="w-full">
                <ScrollShadow
                  className="w-full flex items-start justify-center"
                  orientation="vertical"
                  size={8}
                >
                  <p className="w-full p-4 text-justify break-words whitespace-pre-line bg-gray-800 rounded-lg ">
                    {contenido}
                  </p>
                </ScrollShadow>
              </ModalBody>
              <ModalFooter className="flex items-center justify-between gap-2">
                <div className="flex flex-col items-center justify-center gap-2 w/12">
                  <Chip size="sm" variant="flat" color={color()}>
                    {tipo}
                  </Chip>
                  <div className="flex items-center gap-2">
                    <Chip
                      endContent={tareaFueraDeFecha ? (<DangerIcon />) : null}
                      variant="light"
                      color={tareaFueraDeFecha ? "warning" : "default"}
                    >
                      {dia +
                        "-" +
                        mes +
                        "-" +
                        annyo +
                        " " +
                        hora +
                        ":" +
                        minuto}
                    </Chip>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 w/12">
                  <Button color={color()} radius="lg" onPress={onClose}>
                    Salir
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
