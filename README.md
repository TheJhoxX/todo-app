# todo-app

## /client

Dentro de esta carpeta se encuentran los ficheros correspondientes al backend, Realizado mediante Next.js 13 y utilizando la librería de componentes NextUI.

Enlace a Next.js: https://nextjs.org/
Enlace a NextUI: https://nextui.org/

Para arrancar un servidor de desarrollo:

1. Ejecutar `npm install` en el directorio: `/client/`.
2. Ejecutar: `npm run dev`.
3. Acceder a: ` http://localhost:3000/` .

## /server

Dentro de esta carpeta se encuentran los ficheros correspondientes a un API realizado mediante Node.js, Express, Express-session y Cors. 
Para poder modificar el contenido de la Base de Datos he utilizado el módulo mysql12 y he utilizado mi base de datos: todoApp (el usuario que desee probar la aplicación puede usar el nombre que quiera siempre que configure correctamente el fichero `.env`).

Para arrancar el servidor que recibe las peticiones: 

1. Ejecutar `npm install` en el directorio: `/server/`.
2. Configurar el fichero `.env`.
3. Ejecutar: `node index.js`.

## ANOTACIONES:

Se deberá tener ambos servidores en ejecución para el correcto funcionamiento de la aplicación, tanto el del cliente como el del servidor.

En el directorio raíz del repositorio se encuentra un fichero con extensión .sql para la creación de las tablas de la base de datos.

Traté de desplegar la aplicación y teniendo ya todo conectado no fui capaz de mantener las sesiones ya que por alguna razón no se enviaban cookies por parte del cliente, desconozco a que se debe porque según la documentación del paquete: `express-session` estaban ya las configuraciones necesarias, cualquier ayuda o aclaración es bienvenida.
