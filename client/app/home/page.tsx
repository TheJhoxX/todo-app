"use client";
import { Tabs, Tab } from "@nextui-org/react";
import Tarea from "@/components/tarea";
    
export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center gap-12">
      <Tabs className="mt-4 shadow-purple-500" color="primary" radius="full" variant="bordered">
        <Tab key="todas" title="Todas"></Tab>
        <Tab key="importante" title="Importante"></Tab>
        <Tab key="normal" title="Normal"></Tab>
        <Tab key="opcional" title="Opcional"></Tab>
      </Tabs>
      <div className="w-11/12 flex flex-col items-center gap-4">
              <Tarea tipo={"importante"} />
              <Tarea tipo={"normal"} />
              <Tarea tipo={"opcional"} />
      </div>
    </div>
  );
}
