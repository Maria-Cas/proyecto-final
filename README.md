# Aplicación de Gestión AMPA

Esta aplicación permite gestionar la base de datos de alumnos para el AMPA del colegio.

## Requisitos previos

- Node.js (versión 14 o superior)
- MongoDB instalado y ejecutándose localmente
- npm (gestor de paquetes de Node.js)

## Instalación

1. Clona este repositorio o descarga los archivos
2. Abre una terminal en la carpeta del proyecto
3. Ejecuta el siguiente comando para instalar las dependencias:
   ```bash
   npm install
   ```

## Configuración

1. Asegúrate de que MongoDB está ejecutándose en tu sistema
2. La aplicación se conectará por defecto a `mongodb://localhost:27017/ampa_db`

## Ejecución

1. Para iniciar el servidor, ejecuta:
   ```bash
   npm start
   ```
2. Para desarrollo (con recarga automática), ejecuta:
   ```bash
   npm run dev
   ```
3. Abre tu navegador y visita `http://localhost:3000`

## Funcionalidades

- Registro de nuevos alumnos
- Listado de todos los alumnos
- Eliminación de alumnos
- Marcado de socios del AMPA
- Gestión de información de contacto de padres/madres

## Estructura del proyecto

- `server.js`: Servidor Express y configuración de la API
- `public/`: Archivos estáticos del frontend
  - `index.html`: Página principal
  - `styles.css`: Estilos de la aplicación
  - `app.js`: Lógica del frontend
# proyecto-final
