import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  Divider,
} from "@nextui-org/react";

interface detallesTarea {
  isOpen: boolean;
  onOpenChange: () => void;
  titulo: string;
  contenido: string;
  tipo: string;
  fechaLimite: string;
}

export default function DetallesDeTarea({
  isOpen,
  onOpenChange,
  titulo,
  contenido,
  tipo,
  fechaLimite,
}: detallesTarea) {
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
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-center capitalize">
                <h1 className="text-xl">{titulo}</h1>
              </ModalHeader>
              <Divider />
              <ModalBody className="flex flex-col items-center gap-4">
                <p>{contenido}</p>
              </ModalBody>
              <ModalFooter className="flex items-center justify-between gap-2">
                <div className="flex flex-col items-center justify-center gap-2 w/12">
                  <Chip size="sm" variant="flat" color={color()}>
                    {tipo}
                  </Chip>
                  <p>
                    {dia + "-" + mes + "-" + annyo + " " + hora + ":" + minuto}
                  </p>
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
