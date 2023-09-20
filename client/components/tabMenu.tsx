import { Tabs, Tab } from "@nextui-org/react";
import { Key } from "react";

interface tabMenuProps {
  selectedTab: string,
  handleSelectionChange: (key: Key) => any
}

export default function TabMenu({selectedTab, handleSelectionChange}: tabMenuProps) {

  return (

    <div className="w-11/12 flex items-center justify-center">
      <div className="flex items-center justify-center w-full md:w-1/2 lg:w-1/2">
        <Tabs
          className="mt-4 shadow-purple-500"
          color="primary"
          radius="full"
          variant="bordered"
          fullWidth={true}
          selectedKey={selectedTab}
          onSelectionChange={handleSelectionChange}
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
