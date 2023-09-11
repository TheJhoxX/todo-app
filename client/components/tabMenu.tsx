import { Tabs, Tab } from "@nextui-org/react"

export default function tabMenu() {
    return (
        <Tabs
        className="mt-4 shadow-purple-500"
        color="primary"
        radius="full"
        variant="bordered"
      >
        <Tab key="todas" title="Todas"></Tab>
        <Tab key="importante" title="Importante"></Tab>
        <Tab key="normal" title="Normal"></Tab>
        <Tab key="opcional" title="Opcional"></Tab>
      </Tabs>
    )
}