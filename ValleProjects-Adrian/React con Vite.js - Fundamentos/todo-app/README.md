# Introducción

Esta documentación describe el flujo y funcionamiento del código de una aplicación de lista de tareas construida con Vite.js y React. La aplicación permite a los usuarios agregar, completar y eliminar tareas.

## Estructura del Proyecto

- **`src/`**: Carpeta principal donde se encuentran los archivos de la aplicación.
  - **`App.jsx`**: Componente principal de la aplicación.
  - **`main.jsx`**: Punto de entrada de la aplicación.
  - **`App.css`**: Archivo de estilos CSS.

## Descripción del Código

### 1. Importaciones

- **`React`**: Importa la biblioteca React, que es necesaria para crear componentes.
- **`useState`**: Hook de React que permite gestionar el estado en componentes funcionales.
- **`'./App.css'`**: Importa el archivo CSS para estilizar la aplicación.

### 2. Componente Principal: `App`

- **`tasks`**: Array que almacena las tareas.
- **`taskInput`**: Almacena el texto del input para nuevas tareas.

### 3. Funciones de Manejo de Tareas

- **`addTask`**: Agrega una nueva tarea a la lista si el input no está vacío.
- **`toggleTaskCompletion`**: Cambia el estado de completado de una tarea al hacer clic en ella.
- **`removeTask`**: Elimina una tarea de la lista.

### 4. Renderizado de la Interfaz

- Muestra el título, un input para nuevas tareas, un botón para agregar y una lista de tareas renderizadas.

### 5. Estilos en `App.css`

- Define la apariencia de la aplicación, incluyendo estilos para el contenedor, tareas completadas y elementos interactivos.