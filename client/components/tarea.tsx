import { Button, Checkbox, Tooltip, Chip } from "@nextui-org/react";
import { useState } from "react";
import EyeIcon from "./eyeIcon";
import { color } from "framer-motion";

export default function Tarea({
  titulo,
  tipo,
}: {
  titulo: string;
  tipo: string;
}) {
  const [isSelected, setIsSelected] = useState(false);

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
  };

  return (
    <div
    className={`rounded-xl p-3 w-full 
    flex flex-col md:flex-row lg:flex-row items-center 
    justify-between md:gap-4 lg:gap-4
    transition duration-1000 bg-white
    ${sombra()} hover:cursor-pointer`}
      onClick={handleClick}
    >
      <div className="flex flex-col gap-2 items-center justify-center w-full md:justify-start lg:w-1/2 lg:justify-start">
        <div className=" w-full flex items-center justify-center md:justify-start lg:justify-start ">
        <Checkbox
          isSelected={isSelected}
          onValueChange={handleClick}
          color={importancia()}
          lineThrough
          >
             <p className="font-bold text-black">{titulo}</p>
        </Checkbox>
        </div>
        <h1 className="text-gray-500 text-medium md:hidden lg:hidden">15-11-2002</h1>
      </div>
      <div className="flex justify-between items-center w-full md:justify-end lg:justify-end gap-2 ">
        <Chip size="sm" variant="flat" color={importancia()} className="w-1/3">
          {tipo}
        </Chip>
        <h1 className=" md:text-gray-500 md:text-sm lg:text-medium lg:text-gray-500">15-11-2002</h1>
        <Tooltip content="Ver detalles de la tarea">
          <Button className="bg-gray-200" size="sm">
            <EyeIcon />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
