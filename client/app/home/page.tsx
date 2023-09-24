"use client";
import { Button, Tooltip } from "@nextui-org/react";
import Tarea from "../../components/Tarea";
import { Key, useEffect, useState } from "react";
const llamadasAEndpoints = require("../../utils/llamadasAEndpoints");
import TabMenu from "../../components/tabMenu";
import FormularioTarea from "../../components/FormularioTarea";

interface tarea {
  id: number;
  idUsuario: number;
  titulo: string;
  contenido: string;
  fechaLimite: string; // Puede ser una cadena ISO 8601 o un objeto Date
  tipo: "importante" | "normal" | "opcional";
  handleseleccionTarea: (id: number, quitar: Boolean) => void;
}

export default function Home() {
  const [tareas, setTareas] = useState<tarea[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("todas");
  const [tareasSeleccionadas, setTareasSeleccionadas] = useState<number[]>([]);
  const [botonEliminarDesactivado, setBotonEliminarDesactivado] =
    useState(true);

  useEffect(() => {
    const actualizarEstadoBoton = () => {
      if (tareasSeleccionadas.length > 0) {
        setBotonEliminarDesactivado(false);
      } else {
        setBotonEliminarDesactivado(true);
      }
    };
    actualizarEstadoBoton();
  });

  const handleSeleccionTarea = (id: number, quitar: boolean) => {
    if (quitar === true) {
      // Agregar el ID a la lista si quitar es false
      setTareasSeleccionadas((prevTareasSeleccionadas) => [
        ...prevTareasSeleccionadas,
        id,
      ]);
    } else {
      // Quitar el ID de la lista si quitar es true
      setTareasSeleccionadas((prevTareasSeleccionadas) =>
        prevTareasSeleccionadas.filter((x) => x !== id)
      );
    }
  };

  const eliminarTareas = async () => {
    const exito = await llamadasAEndpoints.eliminarTareas(tareasSeleccionadas);
    obtenerTareas()
  };

  const handleSelectionChange = (key: Key) => {
    setSelectedTab(key.toString());
  };

  const onOpenChange = () => {
    setIsOpen(!isOpen);
  };

  const obtenerTareas = () => {
    llamadasAEndpoints
      .obtenerTareasDeUsuario()
      .then((tareas: tarea[]) => {
        // Aquí definimos el tipo del parámetro como Tarea[]
        if (tareas) {
          setTareas(tareas);
        } else {
          setTareas([]);
        }
      })
      .catch((error: Error) => {
        console.error("Error al obtener tareas:", error);
      });
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-12">
      <TabMenu
        selectedTab={selectedTab}
        handleSelectionChange={handleSelectionChange}
      />
      <FormularioTarea
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        getTareas={obtenerTareas}
      />
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
            isDisabled={botonEliminarDesactivado ? true : false}
            onPress={eliminarTareas}
          >
            Eliminar tareas
          </Button>
        </Tooltip>
      </div>
      <div className="w-11/12 flex flex-col items-center gap-6">
        {tareas.map((tarea: tarea) => {
          if (selectedTab === "todas") {
            return (
              <Tarea
                id={tarea.id}
                key={tarea.id}
                titulo={tarea.titulo}
                contenido={tarea.contenido}
                fechaLimite={tarea.fechaLimite}
                tipo={tarea.tipo}
                handleSeleccionTarea={handleSeleccionTarea}
              />
            );
          }
          if (tarea.tipo === selectedTab) {
            return (
              <Tarea
                id={tarea.id}
                key={tarea.id}
                titulo={tarea.titulo}
                contenido={tarea.contenido}
                fechaLimite={tarea.fechaLimite}
                tipo={tarea.tipo}
                handleSeleccionTarea={handleSeleccionTarea}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
