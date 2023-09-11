import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface FormularioTareaProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

function MiComponente({ isOpen, onOpenChange }: FormularioTareaProps) {

  return (
    <>
      <Modal
        scrollBehavior="inside"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-center capitalize">
                <h1 className="text-xl">Añadir tarea</h1>
              </ModalHeader>
              <ModalBody>Aquí va el contenido del modal</ModalBody>
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
      {/* Otro contenido de tu componente */}
    </>
  );
}

export default MiComponente;
