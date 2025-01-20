# Documentación del Proyecto: Convertidor de Unidades

## Descripción del Proyecto

Este proyecto es una aplicación web que permite convertir entre metros y kilómetros. Los usuarios pueden ingresar una cantidad en metros y obtener el equivalente en kilómetros, y viceversa.

## Estructura del Proyecto

El proyecto está compuesto por los siguientes archivos:

1. `index.html`: Documento HTML que contiene la estructura de la aplicación.
2. `styles.css`: Archivo CSS para el estilo visual de la aplicación.
3. `script.js`: Archivo JavaScript que contiene la lógica de conversión.

#### Desglose de la lógica:

- **Funciones de Conversión**:
  - `convertirMetrosAKilometros`: Convierte metros a kilómetros. Rechaza la promesa si el valor no es un número.
  - `convertirKilometrosAMetros`: Convierte kilómetros a metros. Igualmente, maneja errores.

- **Manejo de Eventos**:
  - Se agregan listeners a los botones. Cuando se hace clic en un botón:
    - Se obtiene el valor del campo de entrada, se convierte a número y se llama a la función correspondiente.
    - Se manejan las respuestas de la promesa para mostrar el resultado o un mensaje de error.

## Flujo de Ejecución

1. El usuario abre el archivo `index.html` en un navegador web.
2. El usuario ingresa un valor en metros o kilómetros.
3. El usuario hace clic en el botón de "Convertir".
4. Se ejecuta la función correspondiente, y el resultado se muestra en la página.

## Cómo Ejecutar el Proyecto

1. Asegúrate de tener un navegador web instalado (como Chrome, Firefox, etc.).
2. Descarga los archivos `index.html`, `styles.css`, y `script.js`.
3. Abre el archivo `index.html` en el navegador.
4. Interactúa con la aplicación ingresando valores y haciendo clic en los botones de conversión.