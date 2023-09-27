import { Button, Checkbox, Tooltip, Chip } from "@nextui-org/react";
import { useState } from "react";
import DetallesDeTarea from "./DetallesDeTarea";
import EyeIcon from "./eyeIcon";
import DangerIcon from "./DangerIcon";

interface detallesTarea {
  id: number;
  titulo: string;
  contenido: string;
  tipo: string;
  fechaLimite: string;
  handleSeleccionTarea: (id: number, quitar: boolean) => void;
}

export default function Tarea({
  id,
  titulo,
  contenido,
  tipo,
  fechaLimite,
  handleSeleccionTarea,
}: detallesTarea) {
  const [isSelected, setIsSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const fecha = new Date(fechaLimite);
  const dia = fecha.getDate();
  const mes = fecha.getMonth();
  const annyo = fecha.getFullYear();
  const hora = fecha.getHours();
  const minuto = fecha.getMinutes();

  const onOpenChange = () => {
    setIsOpen(!isOpen);
  };

  const divider = () => {
    if (tipo === "importante") {
      return "bg-danger";
    } else if (tipo === "normal") {
      return "bg-primary";
    } else {
      return "bg-secondary";
    }
  };

  const importancia = () => {
    if (tipo === "importante") {
      return "danger";
    } else if (tipo === "normal") {
      return "primary";
    } else {
      return "secondary";
    }
  };

  const sombra = () => {
    if (isSelected) {
      if (tipo === "importante") {
        return "transition duration-1000 -translate-y-2 shadow-danger shadow-lg";
      } else if (tipo === "normal") {
        return "transition duration-1000 -translate-y-2 shadow-primary shadow-lg transition-customShadow duration-1000";
      } else if (tipo === "opcional") {
        return "transition duration-1000 -translate-y-2 shadow-secondary shadow-lg transition-customShadow duration-1000";
      }
    } else {
      return "";
    }
  };

  const handleClick = () => {
    setIsSelected(!isSelected);
    if (isSelected) {
      handleSeleccionTarea(id, false);
    } else {
      handleSeleccionTarea(id, true);
    }
  };

  const tareaFueraDeFecha = (): boolean => {
    if (new Date(fechaLimite) < new Date()) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div
        className={`rounded-xl p-3 w-full justify-between ${sombra()} hover:cursor-pointer transition duration-1000 
        ${tareaFueraDeFecha() ? "bg-warning" : "bg-white"}
        flex flex-col items-center relative
        md:flex-row md:items-center md:justify-between md:gap-4 
        lg:flex-row lg:items-center lg:justify-between lg:gap-4`}
        onClick={handleClick}
      >
        <div
          className="flex flex-col gap-2 items-center justify-center w-full 
        md:w-1/2 md:justify-start
        lg:w-1/2 lg:justify-start"
        >
          <div
            className="w-full max-w-full flex items-center justify-center 
          md:w-full md:justify-start
          lg:w-full lg:justify-start "
          >
            <Checkbox
              isSelected={isSelected}
              onValueChange={handleClick}
              color={importancia()}
              lineThrough
              className="w-full"
            >
              <p className="font-bold text-black break-words text-justify">
                {titulo.length > 40 ? titulo.slice(0, 40) + "..." : titulo}
              </p>
            </Checkbox>
          </div>
          <h1
            className={`${
              tareaFueraDeFecha() ? "text-white font-semibold" : "text-gray-500"
            } flex items-center gap-2 text-medium md:hidden lg:hidden`}
          >
            {dia + "-" + mes + "-" + annyo + " " + hora + ":" + minuto}
            { tareaFueraDeFecha() ? <DangerIcon /> : null }
          </h1>
        </div>

        {/* PARTE DE INFORMACIÓN */}
        <div
          className="flex justify-between items-center w-full gap-2
        md:justify-end md:w-1/2
        lg:justify-end lg:w-1/2  "
        >
          <Chip size="sm" 
          variant={`${tareaFueraDeFecha() ? 'shadow' : "shadow"}`} color={importancia()}>
            {tipo}
          </Chip>
          <h1
            className={`hidden md:flex md:items-center md:gap-2 ${
              tareaFueraDeFecha()
                ? "md:text-white font-semibold  lg:text-white lg:font-semibold "
                : "md:text-gray-500 lg:text-gray-500"
            } md:text-sm lg:flex lg:items-center lg:gap-2 lg:text-medium `}
          >
            {dia + "-" + mes + "-" + annyo + " " + hora + ":" + minuto}
            { tareaFueraDeFecha() ? <DangerIcon /> : null }
          </h1>
          <Tooltip content="Ver detalles de la tarea">
            <Button onPress={onOpenChange} className="bg-gray-200" size="sm">
              <EyeIcon />
            </Button>
          </Tooltip>
          
        </div>
      </div>

      <DetallesDeTarea
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        titulo={titulo}
        contenido={contenido}
        fechaLimite={fechaLimite}
        tipo={tipo}
        tareaFueraDeFecha={tareaFueraDeFecha()}
      />
    </>
  );
}
