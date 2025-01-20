# Proyecto de Gestión de Ofertas Laborales

Este proyecto consiste en un conjunto de scripts para gestionar ofertas laborales almacenadas en una base de datos MongoDB. Incluye la inserción de nuevas ofertas desde archivos JSON y la eliminación de ofertas vencidas.

---

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con la siguiente información:

MONGO_URL=mongodb://
DB_NAME=
COLLECTION_NAME=

### Instalación de Dependencias

Ejecuta el siguiente comando para instalar las dependencias necesarias:

npm install mongodb moment dotenv

## Archivos del Proyecto

### 1. `insertarofertas.js`

Este script lee archivos JSON de una carpeta llamada Registro, inserta los datos en una colección MongoDB y elimina los archivos JSON después de procesarlos.

#### Funcionalidad

- Lee archivos JSON desde la carpeta `Registro`.
- Inserta las ofertas laborales en la colección MongoDB.
- Elimina los archivos JSON después de insertarlos.

#### Ejecución

Para ejecutar el script, usa el siguiente comando:

node insertarofertas.js

### 2. `vencimientofecha.js`

Este script revisa las ofertas laborales en la colección MongoDB y elimina las ofertas que ya han vencido.

#### Funcionalidad

- Conecta a la base de datos MongoDB.
- Consulta todas las ofertas laborales con el campo `ClosingDate`.
- Filtra y elimina las ofertas que han vencido.

#### Ejecución

Para ejecutar el script, usa el siguiente comando:

node vencimientofecha.js

## Flujo del Programa

### Insertar Ofertas

- Coloca los archivos JSON con las ofertas laborales en la carpeta `Registro`.
- Ejecuta `insertarofertas.js` para leer los archivos, insertar los datos en MongoDB y eliminar los archivos procesados.

### Eliminar Ofertas Vencidas

- Ejecuta `vencimientofecha.js` para revisar las ofertas almacenadas en MongoDB y eliminar las que hayan vencido según su campo `ClosingDate`.