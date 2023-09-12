import { Tabs, Tab } from "@nextui-org/react";

export default function tabMenu() {
  return (
    <div className="w-11/12 flex items-center justify-center">
      <div className="flex items-center justify-center w-1/2">
        <Tabs
          className="mt-4 shadow-purple-500"
          color="primary"
          radius="full"
          variant="bordered"
          fullWidth={true}
        >
          <Tab key="todas" title="Todas"></Tab>
          <Tab key="importante" title="Importante"></Tab>
          <Tab key="normal" title="Normal"></Tab>
          <Tab key="opcional" title="Opcional"></Tab>
        </Tabs>
      </div>
    </div>
  );
}
