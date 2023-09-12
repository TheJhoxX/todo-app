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
    flex items-center justify-between gap-4
    transition duration-1000 bg-white
    ${sombra()} hover:cursor-pointer`}
    onClick={handleClick}
    >
      <Checkbox
        isSelected={isSelected}
        onValueChange={handleClick}
        color={importancia()}
        className="w-full h-full"
        lineThrough
      >
        <p className="font-bold text-black">{titulo}</p>
      </Checkbox>
      <Chip size="sm" variant="flat" color={importancia()}>
        {tipo}
      </Chip>
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-gray-500">15-11-2002</h1>
        <Tooltip content="Ver detalles de la tarea">
          <Button className="bg-gray-200" size="sm">
            <EyeIcon />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
