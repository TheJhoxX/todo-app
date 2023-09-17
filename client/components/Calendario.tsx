import React from "react";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { es } from "date-fns/locale";

interface CalendarioProps {
    cambiarFechaSeleccionada: (selected: Date | undefined) => void;
}

export default function Example({ cambiarFechaSeleccionada }: CalendarioProps) {
  const [selected, setSelected] = React.useState<Date>();

  const handleValorLocal = (date: Date | undefined) => {
    setSelected(date);
    cambiarFechaSeleccionada(date);
  }
  
    
  let footer = <p>Selecciona un dia</p>;
  if (selected) {
    footer = <p>Has seleccionado: {format(selected, "PP")}.</p>;
  }
  return (
    <>
      <DayPicker
        mode="single"
        locale={es}
        selected={selected}
        onSelect={handleValorLocal}
        footer={footer}
      />
      </>
  );
}
