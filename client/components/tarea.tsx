import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Checkbox,
  ScrollShadow,
} from "@nextui-org/react";
import { useState } from "react";

export default function Tarea({ tipo }: { tipo: string }) {
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
        return "transition duration-1000 -translate-y-2 shadow-danger shadow-lg"
      } 
      else if (tipo === "normal") {
        return "transition duration-1000 -translate-y-2 shadow-primary shadow-lg transition-customShadow duration-1000"
      }
      else if (tipo === "opcional") {
        return "transition duration-1000 -translate-y-2 shadow-secondary shadow-lg transition-customShadow duration-1000"
      }
    } else {
      return ""
    }
  }
  return (
    <>
      <div  className={`rounded-xl flex flex-col items-center transition duration-1000 bg-white ${sombra()}`}>
        <div className="p-2 w-full flex items-center justify-between gap-4">
          <Checkbox
            isSelected={isSelected}
            onValueChange={setIsSelected}
            color={importancia()}
            className="w-full h-full"
            lineThrough
          >
            <p className="font-bold text-black">Titulo ejemplo</p>
          </Checkbox>
          <h1 className="text-gray-500">15-11-2002</h1>
        </div>
        <Divider className={`${divider()} h-2`} />
        <div className="p-2 flex items-center justify-around gap-4 max-h-28">
          <ScrollShadow className="w-full h-full" size={20}>
            <p className="text-black text-justify">
              En el texto argumentativo, el autor plantea una hipotesis o toma
              una posicion frente a un determinado tema (como en este caso
              frente a la politica de Bush) y la mantiene a lo largo del texto,
              reforzando su opinion por medio del desarrollo de sus ideas,
              ejemplos, etc. Mediante la argumentacion, el emisor pretende
              influir sobre su destinatario y lograr la aprobacion y/o adhesion
              del receptor a la idea que postula. Este tipo de textos tienen
              tambien como caracteristica un caracter dialogico: un dialogo con
              el pensamiento del otro para transformar su opinion.
            </p>
          </ScrollShadow>
        </div>
      </div>
    </>
  );
}
