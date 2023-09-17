"use client";
import { Button, Tooltip, useDisclosure } from "@nextui-org/react";
import Tarea from "@/components/tarea";
import { useEffect, useState } from "react";
const llamadasAEndpoints = require("../../utils/llamadasAEndpoints");
import TabMenu from "@/components/tabMenu";
import FormularioTarea from "@/components/FormularioTarea";

interface tarea {
  id: number;
  idUsuario: number;
  titulo: string;
  contenido: string,
  fechaLimite: string; // Puede ser una cadena ISO 8601 o un objeto Date
  tipo: "importante" | "normal" | "opcional",
}

export default function Home() {
  const [tareas, setTareas] = useState<tarea[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const onOpenChange = () => {
    setIsOpen(!isOpen);
  };

  const obtenerTareas = () => {
    llamadasAEndpoints
      .obtenerTareasDeUsuario()
      .then((tareas: tarea[]) => {
        // Aquí definimos el tipo del parámetro como Tarea[]
        setTareas(tareas);
      })
      .catch((error: Error) => {
        console.error("Error al obtener tareas:", error);
      });
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center gap-12">
      <TabMenu />
      <FormularioTarea isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className="flex items-center justify-between gap-4 w-11/12">
        <Button
          onPress={onOpenChange}
          color="primary"
          className="font-bold text-white"
          radius="full"
        >
          Añadir tarea
        </Button>
        <Tooltip color="danger" content="Las tareas seleccionadas finalizarán">
          <Button
            color="danger"
            variant="flat"
            className="font-bold"
            radius="full"
          >
            Eliminar tareas
          </Button>
        </Tooltip>
      </div>
      <div className="w-11/12 flex flex-col items-center gap-6">
        {tareas.map((tarea: tarea) => {
          return (
            <Tarea key={tarea.id} titulo={tarea.titulo} contenido={tarea.contenido} fechaLimite={tarea.fechaLimite} tipo={tarea.tipo} />
          );
        })}
      </div>
    </div>
  );
}
