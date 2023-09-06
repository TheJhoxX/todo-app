import {Card, CardBody, CardHeader, Divider, Checkbox, CardFooter, ScrollShadow} from '@nextui-org/react'
export default function Tarea({ tipo }: { tipo: string }) {
  const importancia = () => {
    if (tipo === "importante") {
      return "danger";
    } else if (tipo === "normal") {
      return "primary";
    } else {
      return "secondary";
    }
  };

  return (
    <>
      <Card radius="lg" className="w-full py-2 bg-white text-black">
        <CardHeader>
          <Checkbox color={importancia()} className="w-full h-full" lineThrough>
            <p className="font-bold text-black">Titulo ejemplo</p>
          </Checkbox>
        </CardHeader>
        <Divider className={`bg-${importancia()} h-2`} />
        <CardBody className="flex items-center justify-around gap-4 max-h-28">
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
        </CardBody>
      </Card>
    </>
  );
}