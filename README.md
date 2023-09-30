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
Para poder modificar el contenido de la Base de Datos he utilizado el módulo mysql12 y he utilizado mi base de datos: todoApp (el usuario que desee probar la aplicación puede usar el nombre que quiera siempre que configure correctamente el fichero de conexion.js).

Para arrancar el servidor que recibe las peticiones: 

1. Ejecutar `npm install` en el directorio: `/server/`.
2. Acceder al fichero: `conexion.js`.
3. Modificar el contenido de `conexion.js` y adecuarlo a los requerimientos del usuario que desee probar la aplicación.
4. Ejecutar: `node index.js`.

## ANOTACIONES:

Se deberá tener ambos servidores en ejecución para el correcto funcionamiento de la aplicación, tanto el del cliente como el del servidor.

En el directorio raíz del repositorio se encuentra un fichero con extensión .sql para la creación de las tablas de la base de datos.
